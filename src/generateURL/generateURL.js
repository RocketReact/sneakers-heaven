/**
 * Generates SEO-friendly URL for product detail page
 * @param {Object} product - Product object with id and title properties
 * @returns {string} URL path with product ID and slug from title
 */
export default function generateProductLink(product) {
    // Fallback to ID-only URL if product or title is missing
    if (!product || !product.title) return `/product/${product.id}`;

    // Create URL-friendly slug from first 4 words of product title
    const words = product.title
        .split(' ')
        .slice(0, 4)
        .join('-')
        .toLowerCase()

    // Return URL with both ID and title slug for better SEO
    return `/product/${product.id}/${words}`;
}