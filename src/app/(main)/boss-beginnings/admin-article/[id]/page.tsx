import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCurrentContestWinner } from "@/lib/Services/cms_service";

interface AdminArticleDetailPageProps {
  params: Promise<{ id: string }>;
}

const AdminArticleDetailPage = async ({
  params,
}: AdminArticleDetailPageProps) => {
  const { id } = await params;
  const articleId = parseInt(id, 10);

  if (isNaN(articleId)) {
    notFound();
  }

  let article = null;
  try {
    const res = await getCurrentContestWinner();
    const articles = res?.admin_articles ?? [];
    article = articles.find((a) => a.id === articleId) ?? null;
  } catch (err) {
    console.error("Failed to fetch article:", err);
  }

  if (!article) {
    notFound();
  }

  const images = article.media.filter((m) => m.file_type === "image");
  const videos = article.media.filter((m) => m.file_type === "video");

  return (
    <section className="container py-8 md:py-12 lg:py-16">
      {/* Back Link */}
      <div className="mb-6 md:mb-8">
        <Link
          href="/boss-beginnings"
          className="inline-flex items-center gap-2 text-primary-blue text-sm md:text-base font-medium hover:underline"
        >
          ← Back to Boss Beginnings
        </Link>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-black mb-4">
          {article.title}
        </h1>
        <p className="text-black/40 text-sm md:text-base mb-6 md:mb-8">
          Published on{" "}
          {new Date(article.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Media Gallery */}
        {(images.length > 0 || videos.length > 0) && (
          <div className="mb-8 md:mb-10">
            {/* Videos */}
            {videos.length > 0 && (
              <div className="space-y-4 mb-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="relative w-full aspect-video  overflow-hidden bg-black"
                  >
                    <video
                      src={video.url}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Images */}
            {images.length > 0 && (
              <div
                className={`grid gap-4 ${
                  images.length === 1
                    ? "grid-cols-1"
                    : images.length === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {images.map((image) => (
                  <figure
                    key={image.id}
                    className="relative w-full aspect-video  overflow-hidden"
                  >
                    <Image
                      src={image.url}
                      alt={image.file_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </figure>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Article Title */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-black mb-4">
          {article.title}
        </h2>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="text-primary-black text-base md:text-lg lg:text-xl leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

      </div>
    </section>
  );
};

export default AdminArticleDetailPage;
