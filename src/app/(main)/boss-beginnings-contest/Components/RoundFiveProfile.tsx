"use client";

import React, { useEffect, useState } from "react";
import RoundBanner from "./RoundBanner";
import { CMSBossBeginnings } from "@/Types/cms";
import { getBossCms, getCMSAboutData } from "@/lib/Services/cms_service";
import { PageLoader } from "@/Shared/PageLoader";
import WinnersDetails from "../../how-winners-are-chosen/Components/WinnersDetails";
import Sponsors from "../../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";

interface RoundFiveProfileProps {
  businessSlug: string;
}

export default function RoundFiveProfile({
  businessSlug,
}: RoundFiveProfileProps) {
  const [pageData, setPageData] = useState<CMSBossBeginnings | null>(null);
  const [cmsData, setCmsData] = useState<Awaited<
    ReturnType<typeof getCMSAboutData>
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [bossCms, aboutCms] = await Promise.all([
          getBossCms() as Promise<CMSBossBeginnings>,
          getCMSAboutData(),
        ]);
        if (isMounted) {
          setPageData(bossCms);
          setCmsData(aboutCms);
        }
      } catch (err) {
        console.error("Failed to load CMS data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <RoundBanner data={pageData?.boss_beginnings_hero} />
      <WinnersDetails hideVotingSections={true} />
      <Sponsors data={cmsData?.partners} title="Our Event Sponsors" />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
}
