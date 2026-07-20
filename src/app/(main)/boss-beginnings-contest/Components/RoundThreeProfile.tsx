"use client";

import React, { useEffect, useState } from "react";
import RoundBanner from "./RoundBanner";
import { CMSBossBeginnings, CMSHomepage, CMSEventsPage } from "@/Types/cms";
import {
  getBossCms,
  getCMSAboutData,
  getCMSHomepageData,
  getEventsPageCms,
} from "@/lib/Services/cms_service";
import { PageLoader } from "@/Shared/PageLoader";
import Sponsors from "../../_components/Sponsors";
import NewsLetter from "@/Components/Common/NewsLetter";
import RoundTwoAbout from "./roundtwo/RoundTwoAbout";
import RoundStep from "./roundtwo/RoundStep";
import Roundhero from "./Roundhero";

interface RoundThreeProfileProps {
  businessSlug: string;
}

export default function RoundThreeProfile({}: RoundThreeProfileProps) {
  const [bossData, setBossData] = useState<CMSBossBeginnings | null>(null);
  const [cmsData, setCmsData] = useState<Awaited<
    ReturnType<typeof getCMSAboutData>
  > | null>(null);
  const [homepageData, setHomepageData] = useState<CMSHomepage | null>(null);
  const [eventsData, setEventsData] = useState<CMSEventsPage | null>(null);
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
    return (
      <>
        <PageLoader />
      </>
    );
  }

  return (
    <>
      <RoundBanner data={bossData?.boss_beginnings_hero} />
      <RoundTwoAbout />
      <Roundhero data={eventsData?.events_page_hero} />
      <RoundStep />
      <Sponsors data={homepageData?.partners} />
      <NewsLetter title="Be part of the movement. Get stories, updates, and opportunities straight to your inbox." />
    </>
  );
}
