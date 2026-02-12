import { Farro, Inter } from "next/font/google";

//Import Styling
import "./globals.css";
import "../styles/styles.css";
import "../styles/animations.css";
import "../styles/responsive.css";

//Import Header and Footer
import AnimationProvider from "../component/utils/AnimationProvider";
import QueryProvider from "../component/utils/QueryProvider";
import ToastProvider from "../component/utils/ToastProvider";

const farro = Farro({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-secondary",
});

// Metadata configuration
export const metadata = {
  title: "FAM Consultancy - Your Trusted Business Partner",
  description: "Professional consultancy services for businesses worldwide",
  icons: {
    icon: "/icons/favicon.svg",
    shortcut: "/icons/favicon.svg",
    apple: "/icons/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          async
          src="https://cdn.trustindex.io/loader.js?32ac4c36114b994800866f90efb"
        ></script>
      </head>
      <body className={`${farro.variable} ${inter.variable} antialiased`}>
        <ToastProvider />
        <QueryProvider>
          <AnimationProvider>{children}</AnimationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
