import Container from "@/Components/Common/Container";
import { User } from "@/Types/type";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiTwitter } from "react-icons/fi";
import { GoArrowUpRight } from "react-icons/go";

const winnerData: User = {
  name: "Dr. Maya Anderson",
  title: "medical researcher",
  description:
    "Using computational biology to accelerate medical research and drug discovery.",
  tag: "BioTech",
  avatar: "/profile.svg",
  claps: 220,
  saves: 10,
  shares: 90,
  weeklyScore: 256,
  socials: {
    website: "maya.me",
    twitter: "@maya",
  },
};

const SpotlightOfTheWeek = () => {
  return (
    <section className="section">
      <Container>
        <div className="flex items-end justify-between">
          <h2 className="section_title 2xl:!text-6xl">Spotlight of the Week</h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-secondary-black">
            Winner from last week's Final 6
          </p>
        </div>
        <div className="mt-6 md:mt-8 py-5 md:py-6 lg:py-8 px-4 md:px-5 flex flex-col lg:flex-row lg:justify-between gap-4 bg-secondary-gray custom_border custom_shadow">
          <div className="flex gap-3 md:gap-4 lg:gap-5">
            <figure className="size-[60px]">
              <Image
                src={winnerData.avatar}
                width={60}
                height={60}
                alt=""
                className="size-full object-cover rounded-full"
              />
            </figure>
            <div>
              <h5 className="text-lg md:text-xl lg:text-[28px] text-primary-black font-medium">
                {winnerData.name}
              </h5>
              <p className="text-sm md:text-base lg:text-xl text-secondary-black">{winnerData.title}</p>
              <div className="space-y-3">
                <p className="text-primary-black text-sm md:text-base lg:text-xl">
                  {winnerData.description}
                </p>
                <div className="py-1.5 px-3 bg-[#e8e9eb] text-sm md:text-base lg:text-lg rounded-lg inline-block text-secondary-black">
                  {winnerData.tag}
                </div>
                {winnerData.socials && (
                  <div className="flex items-center gap-4 lg:gap-5 text-base md:text-lg lg:text-xl text-primary-blue">
                    {winnerData.socials.website && (
                      <Link href={winnerData.socials.website}>
                        <FiExternalLink />
                      </Link>
                    )}
                    {winnerData.socials.twitter && (
                      <Link href={winnerData.socials.twitter}>
                        <FiTwitter />
                      </Link>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-5 md:gap-6 lg:gap-9 text-sm md:text-base lg:text-xl text-secondary-black">
                  <div className="flex items-center gap-2">
                    <span>👏</span> {winnerData.claps ?? "0"}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔖</span> {winnerData.saves ?? "0"}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      <GoArrowUpRight className="text-2xl" />
                    </span>{" "}
                    {winnerData.shares ?? "0"}
                  </div>
                  <div>Weekly Score: {winnerData.weeklyScore ?? "0"}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex h-fit items-center px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-[#FDC700] bg-[#FDC70029] text-sm md:text-base lg:text-lg text-primary-black">
            🏆 Winner
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SpotlightOfTheWeek;
