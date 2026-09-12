import React from "react";
import type { Metadata } from "next";
import Footer from "@/Shared/Footer";
import Navbar from "@/Shared/Navbar";
import CartProvider from "@/Provider/CartProvider/CartProvider";
import CartDrawer from "@/Shared/CartDrawer";

export const metadata: Metadata = {
  keywords: [
    "Our Social Image",
    "OSI",
    "Indianapolis small business",
    "Indianapolis local artists",
    "business spotlight",
    "artist spotlight",
    "entrepreneurs",
    "creators",
    "OSI Top Business Award",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
      <Navbar />
      <main>{children}</main>
      <CartDrawer />
      <Footer />
    </CartProvider>
  );
};

export default MainLayout;
