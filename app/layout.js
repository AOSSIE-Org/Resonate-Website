import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
