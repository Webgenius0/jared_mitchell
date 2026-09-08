"use client";

import { useEffect, useState } from "react";
import { CMSNewsletter } from "@/Types/cms";
import { Button } from "@/Components/Common/Button";
import SponsorSlider from "@/Components/Common/SponsorSlider";

type NewsletterProps = {
  title?: string;
  sub_title?: string;
  data?: CMSNewsletter;
  sponsors?: {
    metadata?: Array<{
      image?: string;
      link?: string;
      title?: string;
      name?: string;
    }>;
  } | null;
};

const NewsLetter = ({ title, sub_title, data, sponsors }: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [partnerLogos, setPartnerLogos] = useState<
    {
      id: number;
      image?: string;
      link?: string;
      alt?: string;
      title?: string;
    }[]
  >([]);

  useEffect(() => {
    const source = sponsors?.metadata ?? null;

    if (source && source.length > 0) {
      setPartnerLogos(
        source.map((item, index) => ({
          id: index + 1,
          image: item.image,
          link: item.link,
          alt: item.title || item.name || "Community partner logo",
          title: item.title || item.name || "Community partner",
        })),
      );
      return;
    }

    let isMounted = true;

    const fetchHomepageSponsors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/v1/cms/homepage`,
        );
        if (!res.ok) return;

        const json = await res.json();
        const metadata = json?.data?.partners?.metadata ?? [];

        if (!isMounted) return;

        setPartnerLogos(
          metadata.map((item: any, index: number) => ({
            id: index + 1,
            image: item.image,
            link: item.link,
            alt: item.title || item.name || "Community partner logo",
            title: item.title || item.name || "Community partner",
          })),
        );
      } catch {
        if (isMounted) setPartnerLogos([]);
      }
    };

    fetchHomepageSponsors();

    return () => {
      isMounted = false;
    };
  }, [sponsors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/v1/newsletter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (!res.ok) throw new Error("Subscription failed");

      setStatus("success");
      setMessage("You're subscribed! Thanks for joining.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-[#F5F5F7] section mt-6 md:mt-8">
      <div className="container space-y-3 md:space-y-3.5 lg:space-y-4">
        <h2 className="section_title font-bold leading-[130%] max-w-[1200px] mx-auto">
          {data?.title || title}
        </h2>

        {(data?.sub_title || sub_title) && (
          <p className="section_sub_title 2xl:!my-10">
            {data?.sub_title || sub_title}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 sm:justify-between max-w-[600px] md:max-w-[700px] lg:max-w-[800px] w-full py-1.5 md:py-1.5 px-2.5 md:px-2.5 lg:px-4 rounded-xl sm:rounded-full bg-white mx-auto mt-4 md:mt-5 lg:mt-6"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full outline-none text-sm md:text-sm lg:text-base min-w-0 px-2 py-2 sm:py-0"
            required
            disabled={status === "loading"}
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto shrink-0"
          >
            {status === "loading" ? "Submitting..." : "JOIN THE OSI NEWSLETTER"}
          </Button>
        </form>

        {message && (
          <p
            className={`text-center text-lg ${
              status === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {partnerLogos.length > 0 && (
          <div className="pt-2 md:pt-3">
            <SponsorSlider logos={partnerLogos} />
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsLetter;
