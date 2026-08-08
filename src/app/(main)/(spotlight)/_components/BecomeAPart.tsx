"use client";
import { useState } from "react";
import { Button } from "@/Components/Common/Button";
import Container from "@/Components/Common/Container";
import { CMSArtistSpotlightJoin } from "@/Types/cms";
import { SponsorModal } from "@/Components/Common/BecomeSponsorModal";
import Link from "next/link";

const BecomeAPart = ({ data }: { data?: CMSArtistSpotlightJoin }) => {
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);

  return (
    <section className="section">
      <Container>
        <h2 className="section_title max-w-[1300px] mx-auto">
          {data?.title ||
            "Become part of a growing network that celebrates art, business, and community."}
        </h2>
        <div className="text-center mt-10 space-x-4">
          <Button asChild>
            <Link href="/auth/login">Join OSI</Link>
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setIsSponsorModalOpen(true)}
          >
            Become a Sponsor
          </Button>
        </div>
      </Container>

      {isSponsorModalOpen && (
        <SponsorModal onClose={() => setIsSponsorModalOpen(false)} />
      )}
    </section>
  );
};

export default BecomeAPart;
