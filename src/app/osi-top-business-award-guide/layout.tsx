import React from "react";
import Footer from "@/Shared/Footer";
import Navbar from "@/Shared/Navbar";
import CartProvider from "@/Provider/CartProvider/CartProvider";
import CartDrawer from "@/Shared/CartDrawer";

const OsiTopBusinessAwardGuideLayout = ({
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

export const metadata = {
  title: "OSI Top Business Award Guide | OSI",
  description:
    "Step-by-step guide to entering the OSI Top Business Award Contest on OSI.",
};

export default OsiTopBusinessAwardGuideLayout;
