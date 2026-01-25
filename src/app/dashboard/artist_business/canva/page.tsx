import canva from "@/Assets/canva.png";
import Image from "next/image";

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
