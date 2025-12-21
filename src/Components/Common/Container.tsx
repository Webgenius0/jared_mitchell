import { cn } from "@/lib/utils";
import React from "react";

const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <section className={cn(className, `max-w-[1548px] w-full mx-auto max-xl:px-5`)}>{children}</section>;
};

export default Container;
