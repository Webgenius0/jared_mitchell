"use client";

import { useState } from "react";
import { Button } from "@/Components/Common/Button";
import { CMSNewsletter } from "@/Types/cms";

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
    <section className="bg-[#F5F5F7] section mt-14">
      <div className="container space-y-8">
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
          className="flex items-center justify-between max-w-[870px] w-full py-1 md:py-3 px-3 md:px-5 rounded-full bg-white mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full outline-none md:text-lg"
            required
            disabled={status === "loading"}
          />
          <Button type="submit" disabled={status === "loading"}>
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
