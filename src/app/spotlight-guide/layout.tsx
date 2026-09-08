
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
