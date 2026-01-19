import { Raleway } from "next/font/google";
import "./globals.css";
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Resonate - Social Voice Platform",
  description:
    "Resonate is an Open Source social voice platform maintained by AOSSIE. Join rooms, talk to people, and connect with the community.",
  icons: {
    icon: "/resonate_logo_white.svg",
    apple: "/logo192.png",
  },
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
