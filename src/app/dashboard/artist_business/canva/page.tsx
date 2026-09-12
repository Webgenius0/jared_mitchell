import type { Metadata } from "next";
import canva from "@/Assets/canva.png";
import Image from "next/image";

export const metadata = {
  title: "Canva Integration - Design Tools | OSI Artist Dashboard",
  description:
    "Use Canva to design and customize posts for your OSI spotlight. Create professional graphics, social media content, and promotional materials for your artist profile.",
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
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center pt-40">
      <Image src={canva} alt="canva" width={162} height={52} />

      <h3 className="text-5xl font-semibold">
        Customize Your Posts with Canva
      </h3>

      <p className="text-lg text-[#364153]">
        Use Canva to quickly design, edit, and customize posts directly for your
        brand.
      </p>

      <button className="px-36 py-4 text-white rounded-xl cursor-pointer bg-[linear-gradient(136deg,#11B8C1_0%,#475AE4_76.27%,#8E5BE7_93.65%)] text-lg font-medium">
        Go to Canva
      </button>
    </div>
  );
};

export default page;
