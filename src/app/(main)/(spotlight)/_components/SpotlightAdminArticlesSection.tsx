import Image from "next/image";
import Link from "next/link";
import { AdminArticle } from "@/Types/cms";

interface SpotlightAdminArticlesSectionProps {
  articles: AdminArticle[];
  type: "artist" | "business";
}

const SpotlightAdminArticlesSection = ({
  articles,
  type,
}: SpotlightAdminArticlesSectionProps) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="container lg:mt-8 xl:lg:mt-10 mt-4 lg:mt-5 xl:mt-8">
      <h2 className="section_title">OSI Winners Articles</h2>
      <p className="text-sm md:text-base lg:text-lg xl:text-3xl text-center text-primary-black leading-relaxed">
        Read about our spotlight winners and their inspiring journeys.
      </p>

      <div className="w-full md:w-[450px] mt-4 md:mt-5 lg:mt-6 mx-auto lg:gap-6 ">
        {articles.map((article) => {
          const images = article.media.filter(
            (m) => m.file_type === "image",
          );
          const videos = article.media.filter(
            (m) => m.file_type === "video",
          );

          return (
            <div
              key={article.id}
              className="custom_border bg-white overflow-hidden flex flex-col"
            >
              {/* Media Section */}
              <div className="relative w-full h-48 md:h-56 lg:h-64 bg-primary-gray">
                {images.length > 0 ? (
                  <Image
                    src={images[0].url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : videos.length > 0 ? (
                  <video
                    src={videos[0].url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/30 text-sm">
                    No media
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-4 md:p-5 lg:p-6 flex flex-col flex-1">
                <h3 className="text-primary-black text-base md:text-lg lg:text-xl font-semibold mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-secondary-black text-xs md:text-sm lg:text-base line-clamp-3 mb-4 flex-1">
                  {article.content}
                </p>
                <p className="text-black/40 text-xs mb-4">
                  {new Date(article.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                {/* View Details Button */}
                <Link
                  href={`/spotlight-${type}/admin-article/${article.id}`}
                  className="inline-flex items-center justify-center py-2 md:py-2.5 px-5 md:px-6 bg-primary-blue text-white rounded-full text-xs sm:text-sm lg:text-base font-medium transition-opacity hover:opacity-90 w-fit"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SpotlightAdminArticlesSection;
