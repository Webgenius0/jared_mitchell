import React from "react";
import Footer from "@/Shared/Footer";
import Navbar from "@/Shared/Navbar";
import CartProvider from "@/Provider/CartProvider/CartProvider";
import CartDrawer from "@/Shared/CartDrawer";

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
