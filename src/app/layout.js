import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar.jsx";
import NavbarMobile from "@/components/Navbar/NavbarMobile.jsx";
import Footer from "@/components/Others/Footer.jsx";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Art Core | Discover and Purchase Exquisite Artworks",
  description: "Discover and purchase varieties of exquisite artworks by Arundhati Bera.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-metadata.jpg" sizes="any" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Navbar />
          <NavbarMobile />
          <main>
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}