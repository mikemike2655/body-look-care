/**
 * Normalize a Medusa v2 product to the shape expected by the frontend.
 * Medusa prices are in cents → divide by 100 for euros.
 */
export function normalizeProduct(product) {
  if (!product) return null;

  const variant = product.variants?.[0];
  const priceAmount = variant?.calculated_price?.calculated_amount
    ?? variant?.prices?.[0]?.amount
    ?? 0;
  const compareAmount = variant?.calculated_price?.original_amount
    ?? variant?.prices?.[0]?.compare_at_price
    ?? null;

  const imageUrls = product.images?.map(img => img.url).filter(Boolean) ?? [];
  if (product.thumbnail && !imageUrls.includes(product.thumbnail)) {
    imageUrls.unshift(product.thumbnail);
  }

  return {
    id: product.handle,                // slug used for routing & addToCart
    medusaId: product.id,              // actual Medusa ID for API calls
    slug: product.handle,              // alias for ProductCard compat
    name: product.title,
    subtitle: product.subtitle || '',
    price: priceAmount / 100,
    comparePrice: compareAmount ? compareAmount / 100 : null,
    compare_at_price: compareAmount ? compareAmount / 100 : null,
    rating: product.metadata?.rating ? parseFloat(product.metadata.rating) : 4.8,
    reviewCount: product.metadata?.reviews_count ? parseInt(product.metadata.reviews_count) : 0,
    reviews_count: product.metadata?.reviews_count ? parseInt(product.metadata.reviews_count) : 0,
    badge: product.metadata?.badge ?? null,
    images: imageUrls.length ? imageUrls : ['https://via.placeholder.com/400x500?text=BLC'],
    shortDescription: product.subtitle || product.metadata?.short_description || '',
    short_description: product.subtitle || product.metadata?.short_description || '',
    variantId: variant?.id ?? null,
  };
}

/**
 * Normalize a Medusa v2 order to the shape expected by AccountPage.
 */
export function normalizeOrder(order) {
  if (!order) return null;
  return {
    id: order.id,
    order_number: order.display_id ? `#${order.display_id}` : order.id,
    created_at: order.created_at,
    status: order.status,
    total: (order.total ?? 0) / 100,
    subtotal: (order.subtotal ?? 0) / 100,
    shipping: (order.shipping_total ?? 0) / 100,
    email: order.email,
    items: (order.items ?? []).map(item => ({
      id: item.id,
      name: item.title,
      image: item.thumbnail ?? '',
      quantity: item.quantity,
      price: (item.unit_price ?? 0) / 100,
    })),
  };
}
