"use client";

import { useState } from "react";
import { CMSNewsletter } from "@/Types/cms";
import { Button } from "@/Components/Common/Button";

type NewsletterProps = {
  title?: string;
  sub_title?: string;
  data?: CMSNewsletter;
};

const NewsLetter = ({ title, sub_title, data }: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

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
          <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto shrink-0">
            {status === "loading" ? "Submitting..." : "Get started now"}
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
      </div>
    </section>
  );
};

export default NewsLetter;
