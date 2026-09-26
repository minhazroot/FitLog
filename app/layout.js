import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitLogProvider } from "@/context/FitLogContext";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-right" toastOptions={{ style: { background: "#171b1e", color: "#fff", border: "1px solid #31383d" } }} />
        </FitLogProvider>
      </body>
    </html>
  );
}
