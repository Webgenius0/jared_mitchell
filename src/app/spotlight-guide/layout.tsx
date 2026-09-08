import React from "react";
import CartProvider from "@/Provider/CartProvider/CartProvider";
import Navbar from "@/Shared/Navbar";
import CartDrawer from "@/Shared/CartDrawer";
import Footer from "@/Shared/Footer";

const SpotlightGuideLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CartProvider>
      <Navbar />
      <main>{children}</main>
      <CartDrawer />
      <Footer />
    </CartProvider>
  );
};

export default SpotlightGuideLayout;
