import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "../store/Provider";
import axios from "axios"; // ✅ REQUIRED

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ✅ THIS IS THE RIGHT WAY */
export async function generateMetadata() {
  try {
    const res = await axios.post(
      "https://irisinformatics.net/dating/Wb/metadata"
    );

    const list = res?.data?.data || [];
    const first = list[0] || {};

    return {
      title: first.title || "Dating",
      description: first.description || "",
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return {
      title: "Dating",
      description: "",
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black overflow-x-hidden min-h-screen`}
      >
        <ReduxProvider>
          <Header />

          <ToastContainer
            position="top-center"
            autoClose={5000}
            theme="colored"
          />

          {children}

          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
