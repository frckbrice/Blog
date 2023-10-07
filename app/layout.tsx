import "./globals.css";
import Navbar from "./components/Navbar";
import MyProfilPict from "./components/MyProfilPict";
import Welcome from "./components/Welcome";

export const metadata = {
  title: "Avom's blog",
  description: "Create by Avom",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-800">
        <Navbar />
        <MyProfilPict />
        <Welcome />
        {children}
      </body>
    </html>
  );
}
