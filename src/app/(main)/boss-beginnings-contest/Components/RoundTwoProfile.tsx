"use client";

import React, { useEffect, useState } from "react";
import RoundBanner from "./RoundBanner";
import { CMSBossBeginnings, CMSHomepage, CMSEventsPage } from "@/Types/cms";
import {
  getBossCms,
  getCMSAboutData,
  getCMSHomepageData,
  getEventsPageCms,
  getContestantDetails,
} from "@/lib/Services/cms_service";
import { PageLoader } from "@/Shared/PageLoader";
import Sponsors from "../../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import RoundTwoAbout from "./roundtwo/RoundTwoAbout";
import RoundStep from "./roundtwo/RoundStep";
import Roundhero from "./Roundhero";

interface RoundTwoProfileProps {
  contestantId: number;
}

export default function RoundTwoProfile({
  contestantId,
}: RoundTwoProfileProps) {
  const [bossData, setBossData] = useState<CMSBossBeginnings | null>(null);
  const [cmsData, setCmsData] = useState<Awaited<
    ReturnType<typeof getCMSAboutData>
  > | null>(null);
  const [homepageData, setHomepageData] = useState<CMSHomepage | null>(null);
  const [eventsData, setEventsData] = useState<CMSEventsPage | null>(null);
  const [contestant, setContestant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [bossCms, aboutCms, homepageCms, eventsCms] = await Promise.all([
          getBossCms() as Promise<CMSBossBeginnings>,
          getCMSAboutData(),
          getCMSHomepageData() as Promise<CMSHomepage>,
          getEventsPageCms() as Promise<CMSEventsPage>,
        ]);
        if (isMounted) {
          setBossData(bossCms);
          setCmsData(aboutCms);
          setHomepageData(homepageCms);
          setEventsData(eventsCms);
        }
      } catch (err) {
        console.error("Failed to load CMS data:", err);
      }

      if (contestantId > 0) {
        try {
          const res = await getContestantDetails(contestantId);
          if (isMounted)
            setContestant(res?.data?.contestant || res?.data || null);
        } catch (err) {
          console.error("Failed to fetch contestant details:", err);
        }
      }

      if (isMounted) setLoading(false);
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [contestantId]);

  if (loading) {
    return (
      <>
        <PageLoader />
      </>
    );
  }

  // The contestant's submitted round media (submission.media_urls) — use the
  // first video URL as the hero video when available.
  const submissionMedia: string[] =
    contestant?.submission?.media_urls ?? [];
  const submissionVideo =
    submissionMedia.find((url: string) =>
      /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i.test(url),
    ) ?? null;

  return (
    <>
      <RoundBanner data={bossData?.boss_beginnings_hero} />
      <RoundTwoAbout contestant={contestant} />
      <Roundhero
        data={eventsData?.events_page_hero}
        videoSrc={submissionVideo}
      />
      <RoundStep
        contestantId={contestant?.id ?? contestantId}
        roundId={contestant?.current_round?.id}
      />
      <Sponsors data={homepageData?.partners} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
}
