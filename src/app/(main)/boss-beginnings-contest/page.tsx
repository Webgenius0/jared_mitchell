import type { Metadata } from "next";
import { redirect } from "next/navigation";

const page = async () => {
  redirect("/contest");
  return null;
};

export const metadata: Metadata = {
  title: "OSI Top Business Award Contest | Open Spotlight Initiative",
  description:
    "Open the OSI Top Business Award contest page to review the latest business spotlight entries, rounds, and voting information.",
  robots: {
    index: false,
    follow: false,
  },
};

export default page;
