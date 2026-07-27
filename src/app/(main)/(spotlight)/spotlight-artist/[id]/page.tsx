import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuHeart, LuBookmark, LuShare2 } from "react-icons/lu";
import { getArtistById } from "@/lib/Services/cms_service";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const ArtistDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const artistId = parseInt(id, 10);

  if (isNaN(artistId)) notFound();

  let artist;
  try {
    const res = await getArtistById(artistId);
    artist = res?.artist;
  } catch {
    notFound();
  }

  if (!artist) notFound();

  return (
    <section className="min-h-screen bg-[#F5F5F7]">
      {/* Back Navigation */}
      <div className="container py-6">
        <Link
          href="/spotlight-artist"
          className="inline-flex items-center gap-2 text-primary-black hover:text-primary-blue transition-colors font-medium"
        >
          <LuArrowLeft className="text-xl" />
          Back to Artist Spotlight
        </Link>
      </div>

      {/* Main Content */}
      <div className="container pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Artist Card */}
          <div className="bg-white rounded-2xl custom_border custom_shadow overflow-hidden">
            {/* Banner Area */}
            <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary-blue/20 via-purple-100 to-pink-100">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_50%,_rgba(255,255,255,0.9)_100%)]" />
            </div>

            {/* Artist Info */}
            <div className="px-6 md:px-10 pb-8 -mt-20 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                {/* Avatar */}
                <div className="size-36 md:size-44 rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0 bg-white">
                  <Image
                    src={artist.avatar}
                    alt={artist.name}
                    width={176}
                    height={176}
                    className="size-full object-cover"
                  />
                </div>

                {/* Name & Details */}
                <div className="flex-1 pb-2">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-black">
                    {artist.name}
                  </h1>
                  {artist.tagline && (
                    <p className="text-lg md:text-xl text-primary-gray mt-1">
                      {artist.tagline}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="px-4 py-1.5 rounded-full bg-primary-blue/10 text-primary-blue text-sm font-medium">
                      {artist.category?.name || "Artist"}
                    </span>
                    <span className="text-sm text-primary-gray">
                      {artist.username}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-primary-blue hover:text-primary-blue transition-colors text-sm font-medium">
                  <LuHeart className="text-lg" />
                  <span>{artist.likes_count || 0}</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-primary-blue hover:text-primary-blue transition-colors text-sm font-medium">
                  <LuBookmark className="text-lg" />
                  <span>{artist.bookmarks_count || 0}</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-primary-blue hover:text-primary-blue transition-colors text-sm font-medium">
                  <LuShare2 className="text-lg" />
                  <span>{artist.shares_count || 0}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Biography Section */}
          <div className="bg-white rounded-2xl custom_border custom_shadow p-6 md:p-10 mt-8">
            <h2 className="text-2xl font-semibold text-primary-black mb-4">
              About
            </h2>
            {artist.biography ? (
              <p className="text-primary-gray text-lg leading-relaxed">
                {artist.biography}
              </p>
            ) : (
              <p className="text-primary-gray/60 text-lg italic">
                No biography available.
              </p>
            )}
          </div>

          {/* Joined Date */}
          <div className="bg-white rounded-2xl custom_border custom_shadow p-6 md:p-10 mt-8">
            <h2 className="text-2xl font-semibold text-primary-black mb-4">
              Member Since
            </h2>
            <p className="text-primary-gray text-lg">
              {new Date(artist.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistDetailPage;
