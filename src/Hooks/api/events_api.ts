"use client";
import { axiosSecure } from "@/Hooks/useAxiosSecure";

// ─── Direct API call helpers ────────────────────────────────────────────

/**
 * Re-fetch featured events with auth token to get accurate is_liked/is_bookmarked states.
 * Response shape: { data: { events: FeaturedEventItem[] } } → returns { events: [...] }
 */
export const apiGetFeaturedEvents = async () => {
  const res = await axiosSecure.get("/v1/events/featured");
  return res.data.data as { events: any[] };
};

export const apiToggleLike = async (eventId: number) => {
  const res = await axiosSecure.post(`/v1/events/${eventId}/like`);
  return res.data;
};

export const apiToggleBookmark = async (eventId: number) => {
  const res = await axiosSecure.post(`/v1/events/${eventId}/bookmark`);
  return res.data;
};

export const apiShareEvent = async (eventId: number) => {
  const res = await axiosSecure.post(`/v1/events/${eventId}/share`);
  return res.data;
};

// ─── Artist Like ─────────────────────────────────────────────────────────

export const apiToggleArtistLike = async (artistId: number) => {
  const res = await axiosSecure.post(`/v1/artists/${artistId}/like`);
  return res.data;
};

// ─── Spotlight Like (Discover More Artists/Businesses) ───────────────────

export const apiToggleSpotlightLike = async (
  type: "artist" | "business",
  spotlightId: number,
) => {
  const res = await axiosSecure.post(`/v1/spotlight/like/${type}/${spotlightId}`);
  return res.data;
};

// ─── Business Clap (Boss Beginnings) ────────────────────────────────────────

export const apiClapBusiness = async (businessId: number) => {
  const res = await axiosSecure.post(`/v1/businesses/${businessId}/clap`);
  return res.data;
};

// ─── Business Save (Love action) ────────────────────────────────────────────

export const apiSaveBusiness = async (businessId: number) => {
  const res = await axiosSecure.post(`/v1/businesses/${businessId}/save`);
  return res.data;
};

// ─── Business Share (Fire action) ───────────────────────────────────────────

export const apiShareBusiness = async (businessId: number) => {
  const res = await axiosSecure.post(`/v1/businesses/${businessId}/share`);
  return res.data;
};

// ─── Nominee Vote (contest details Clap/like action) ────────────────────────

export const apiVoteNominee = async (nomineeId: number) => {
  const res = await axiosSecure.post(`/v1/spotlight/nominees/${nomineeId}/vote`);
  return res.data;
};
