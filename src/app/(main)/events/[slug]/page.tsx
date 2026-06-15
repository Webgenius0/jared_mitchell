"use client";
import { use, useEffect, useState, useContext } from "react";
import { getEventBySlug } from "@/lib/Services/cms_service";
import { CMSEventItem } from "@/Types/cms";
import { AuthContextProvider } from "@/Provider/AuthProvider/AuthProvider";

export default function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params); 
  const { token } = useContext(AuthContextProvider);
  const [eventDetails, setEventDetails] = useState<CMSEventItem | null>(null);

  useEffect(() => {
    if (slug && token) {
      getEventBySlug(slug, token).then(setEventDetails);
    }
  }, [slug, token]);

  if (!eventDetails) return <div>Loading...</div>;

  return (
    <div>{eventDetails?.title}</div>
  );
}
