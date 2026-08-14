import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const clientRoot = path.join(projectRoot, "dist", "client");
const outputRoot = path.join(projectRoot, ".github-pages");
const vinextCli = path.join(projectRoot, "node_modules", "vinext", "dist", "cli.js");
const port = "4317";
const sourceUrl = `http://127.0.0.1:${port}/`;
const githubPagesSafetyStyle =
  '<style id="github-pages-opening-safety">.opening-sequence{display:none!important}</style>';

const baseArgument = process.argv.find((argument) => argument.startsWith("--base-path="));
const rawBasePath = baseArgument?.slice("--base-path=".length) ?? "/-/";
const basePath = `/${rawBasePath.split("/").filter(Boolean).join("/")}`;
let vitePreloadBaseRewriteCount = 0;

if (path.resolve(outputRoot) !== path.resolve(projectRoot, ".github-pages")) {
  throw new Error("GitHub Pages output path did not pass the safety check.");
}

function rewriteRootPaths(source) {
  return source
    .replaceAll(`${basePath}/assets/`, "__GITHUB_PAGES_ASSETS__")
    .replaceAll(`${basePath}/portfolio/`, "__GITHUB_PAGES_PORTFOLIO__")
    .replaceAll(`${basePath}/favicon.svg`, "__GITHUB_PAGES_FAVICON__")
    .replaceAll("/assets/", `${basePath}/assets/`)
    .replaceAll("/portfolio/", `${basePath}/portfolio/`)
    .replaceAll("/favicon.svg", `${basePath}/favicon.svg`)
    .replaceAll("__GITHUB_PAGES_ASSETS__", `${basePath}/assets/`)
    .replaceAll("__GITHUB_PAGES_PORTFOLIO__", `${basePath}/portfolio/`)
    .replaceAll("__GITHUB_PAGES_FAVICON__", `${basePath}/favicon.svg`);
}

function rewriteVitePreloadBase(source) {
  const functionPattern =
    /([A-Za-z_$][\w$]*)=function\(([A-Za-z_$][\w$]*)\)\{return([`'"])\/\3\+\2\}/g;
  const arrowPattern =
    /([A-Za-z_$][\w$]*)=([A-Za-z_$][\w$]*)=>([`'"])\/\3\+\2/g;

  const functionRewritten = source.replace(
    functionPattern,
    (match, name, parameter, quote) => {
      vitePreloadBaseRewriteCount += 1;
      return `${name}=function(${parameter}){return${quote}${basePath}/${quote}+${parameter}}`;
    },
  );

  return functionRewritten.replace(
    arrowPattern,
    (match, name, parameter, quote) => {
      vitePreloadBaseRewriteCount += 1;
      return `${name}=${parameter}=>${quote}${basePath}/${quote}+${parameter}`;
    },
  );
}

async function rewriteStaticFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await rewriteStaticFiles(entryPath);
        return;
      }

      if (!/\.(?:css|html|js)$/i.test(entry.name)) {
        return;
      }

      const source = await readFile(entryPath, "utf8");
      const rewritten = rewriteVitePreloadBase(rewriteRootPaths(source));

      if (rewritten !== source) {
        await writeFile(entryPath, rewritten, "utf8");
      }
    }),
  );
}

async function waitForServer(server) {
  const deadline = Date.now() + 45_000;
  let lastError;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`The production server exited with code ${server.exitCode}.`);
    }

    try {
      const response = await fetch(sourceUrl, {
        headers: { Accept: "text/html" },
      });

      if (response.ok) {
        return response.text();
      }

      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`The production server did not become ready: ${lastError}`);
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const server = spawn(process.execPath, [vinextCli, "start"], {
  cwd: projectRoot,
  env: { ...process.env, PORT: port },
  stdio: ["ignore", "inherit", "inherit"],
});

try {
  const html = await waitForServer(server);

  if (!html.includes("</html>") || !html.includes("/assets/")) {
    throw new Error("The captured page does not look like the complete portfolio.");
  }

  const staticHtml = html.replace("</head>", `${githubPagesSafetyStyle}</head>`);

  await cp(clientRoot, outputRoot, { recursive: true });
  await writeFile(path.join(outputRoot, "index.html"), staticHtml, "utf8");
  await writeFile(path.join(outputRoot, ".nojekyll"), "", "utf8");
  await rewriteStaticFiles(outputRoot);

  if (vitePreloadBaseRewriteCount === 0) {
    throw new Error("The Vite preload base path was not found in the static bundle.");
  }

  console.log(`GitHub Pages files are ready in ${outputRoot}`);
} finally {
  server.kill();
}
