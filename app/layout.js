import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me A Chai - Fund your projects with chai",
  description: "This website is a frowdfunding platform for creators loveers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]`} >
        <SessionWrapper>

          <Navbar/>
          <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] ">
            {children}
          </div>
          <Footer />

        </SessionWrapper>
        <Toaster position='bottom-center' />
      </body>
    </html>
  );
}
