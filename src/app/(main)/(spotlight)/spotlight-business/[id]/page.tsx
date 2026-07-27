import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuHeart, LuBookmark, LuShare2, LuGlobe, LuMapPin } from "react-icons/lu";
import { getBusinessById } from "@/lib/Services/cms_service";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const BusinessDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const businessId = parseInt(id, 10);

  if (isNaN(businessId)) notFound();

  let business;
  try {
    const res = await getBusinessById(businessId);
    business = res?.business;
  } catch {
    notFound();
  }

  if (!business) notFound();

  return (
    <section className="min-h-screen bg-[#F5F5F7]">
      {/* Back Navigation */}
      <div className="container py-6">
        <Link
          href="/spotlight-business"
          className="inline-flex items-center gap-2 text-primary-black hover:text-primary-blue transition-colors font-medium"
        >
          <LuArrowLeft className="text-xl" />
          Back to Business Spotlight
        </Link>
      </div>

      {/* Main Content */}
      <div className="container pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Business Card */}
          <div className="bg-white rounded-2xl custom_border custom_shadow overflow-hidden">
            {/* Banner Area */}
            <div className="relative h-48 md:h-64 bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0)_50%,_rgba(255,255,255,0.9)_100%)]" />
            </div>

            {/* Business Info */}
            <div className="px-6 md:px-10 pb-8 -mt-20 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                {/* Logo */}
                <div className="size-36 md:size-44 rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0 bg-white flex items-center justify-center">
                  <Image
                    src={business.logo}
                    alt={business.name}
                    width={176}
                    height={176}
                    className="size-full object-contain p-2"
                  />
                </div>

                {/* Name & Details */}
                <div className="flex-1 pb-2">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-black">
                    {business.name}
                  </h1>
                  {business.tagline && (
                    <p className="text-lg md:text-xl text-primary-gray mt-1">
                      {business.tagline}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium">
                      {business.category?.name || "Business"}
                    </span>
                    {(business.city || business.state) && (
                      <span className="flex items-center gap-1 text-sm text-primary-gray">
                        <LuMapPin className="text-base" />
                        {[business.city, business.state]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-primary-gray/70 mt-2">
                    Owned by {business.owner_name}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors text-sm font-medium">
                  <LuHeart className="text-lg" />
                  <span>{business.likes_count || 0}</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors text-sm font-medium">
                  <LuBookmark className="text-lg" />
                  <span>{business.bookmarks_count || 0}</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition-colors text-sm font-medium">
                  <LuShare2 className="text-lg" />
                  <span>{business.shares_count || 0}</span>
                </button>
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-blue text-white hover:bg-primary-blue/90 transition-colors text-sm font-medium ml-auto"
                  >
                    <LuGlobe className="text-lg" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-2xl custom_border custom_shadow p-6 md:p-10 mt-8">
            <h2 className="text-2xl font-semibold text-primary-black mb-4">
              About
            </h2>
            {business.description ? (
              <p className="text-primary-gray text-lg leading-relaxed">
                {business.description}
              </p>
            ) : (
              <p className="text-primary-gray/60 text-lg italic">
                No description available.
              </p>
            )}
          </div>

          {/* Member Since */}
          <div className="bg-white rounded-2xl custom_border custom_shadow p-6 md:p-10 mt-8">
            <h2 className="text-2xl font-semibold text-primary-black mb-4">
              Member Since
            </h2>
            <p className="text-primary-gray text-lg">
              {new Date(business.created_at).toLocaleDateString("en-US", {
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

export default BusinessDetailPage;
