"use client";

import React from "react";
import { useParams } from "next/navigation";
import RoundOneProfile from "../../../Components/RoundOneProfile";
import RoundTwoProfile from "../../../Components/RoundTwoProfile";
import RoundThreeProfile from "../../../Components/RoundThreeProfile";
import RoundFourProfile from "../../../Components/RoundFourProfile";
import RoundFiveProfile from "../../../Components/RoundFiveProfile";


export default function BusinessProfilePage() {
  const params = useParams();
  const round = params?.round as string;
  const businessSlug = (params?.businessSlug as string) ?? "";

  if (round === "round-1") {
    return <RoundOneProfile businessSlug={businessSlug} />;
  }

  if (round === "round-2") {
    return <RoundTwoProfile businessSlug={businessSlug} />;
  }

  if (round === "round-3") {
    return <RoundThreeProfile businessSlug={businessSlug} />;
  }

  if (round === "round-4") {
    return <RoundFourProfile businessSlug={businessSlug} />;
  }

  if (round === "round-5") {
    return <RoundFiveProfile businessSlug={businessSlug} />;
  }

  return <RoundOneProfile businessSlug={businessSlug} />;
}
