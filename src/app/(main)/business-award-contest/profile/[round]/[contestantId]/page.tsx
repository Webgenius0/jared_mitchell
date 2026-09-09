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
  const contestantId = parseInt(params?.contestantId as string, 10);

  if (round === "round-1") {
    return <RoundOneProfile contestantId={contestantId} />;
  }

  if (round === "round-2") {
    return <RoundTwoProfile contestantId={contestantId} />;
  }

  if (round === "round-3") {
    return <RoundThreeProfile contestantId={contestantId} />;
  }

  if (round === "round-4") {
    return <RoundFourProfile contestantId={contestantId} />;
  }

  if (round === "round-5") {
    return <RoundFiveProfile contestantId={contestantId} />;
  }

  return <RoundOneProfile contestantId={contestantId} />;
}
