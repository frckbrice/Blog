import "./globals.css";
import Navbar from "./components/Navbar";
import { Metadata } from "next";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Avom",
    default: "Avom Brice",
  },
  description: "Hello i am Avom. I learn Full-Stack DEV ",
  applicationName: "Avom's blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      {/* <body className="bg-slate-800">  this is avoid dark/light mode*/}
      <body className=" w-full h-screen">
        <Providers>
          <Navbar />
          <main className="px-4 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
