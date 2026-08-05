import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "闫醴炀 | 3D 场景模型制作师",
  description: "3D 场景、PBR 资产与 Unreal Engine 作品集。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
