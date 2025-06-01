import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Monitoring Server",
  description:
    "Real-time server monitoring application for tracking system performance, resource usage, and application health metrics",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
