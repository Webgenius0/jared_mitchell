import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <section className="max-w-[1548px] w-full mx-auto max-xl:px-5">{children}</section>;
};

export default Container;
