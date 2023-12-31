import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ချစ်ရအောင်",
  description: "A simple dating chat app where users can chat with each other.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="valentine">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
