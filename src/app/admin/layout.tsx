import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "S+C 014 /admin",
  description: "Panel de administración del estudio",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
