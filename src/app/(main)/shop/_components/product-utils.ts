import { FeaturedProductItem } from "@/Types/cms";
import { ShopCardProps } from "@/Types/type";

/** Map API product to ShopCardProps for rendering shop cards */
export const mapProductToCardProps = (
  product: FeaturedProductItem,
): ShopCardProps & { brand?: string; slug: string; categoryName: string } => ({
  id: String(product.id),
  slug: product.slug,
  image: product.thumbnail,
  title: product.name,
  description: product.short_description,
  price: `$${product.display_price}`,
  tag: product.type === "digital" ? "Digital" : undefined,
  brand: product.category?.name || product.brand,
  categoryName: product.category?.name || "",
});
