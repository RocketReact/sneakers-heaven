import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Displays product star rating with structured data for SEO
 * @param {string} mainRatingDiv - Optional CSS class for rating container
 */
export default function ProductRating({ mainRatingDiv }) {
    const maxStars = 5;

    // Get product from store using URL parameter
    const { id } = useParams();
    const { products } = useSelector((state) => state.products);
    const product = products.find((product) => product.id === Number(id));

    // Skip rendering if product not found
    if (!product) {
        return <></>;
    }
    const rating = product.rating || { rate: 0, count: 0 };

    return (
        <>
            {/* Star rating display */}
            <div className={`${mainRatingDiv || 'items-center'} flex flex-col gap-4`}>
                <div className='flex mt-3'>
                    {/* Generate 5 stars with filled/empty states based on rating */}
                    {[...Array(maxStars)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.round(rating.rate) ? 'text-yellow-400' : 'text-gray-300'} `}
                            fill='currentColor'
                            viewBox='0 0 20 20'
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902
                            0l1.518 4.674a1 1 0 00.95.69h4.924c.969 0 1.372
                            1.24.588 1.81l-3.982 2.89a1 1 0 00-.364 1.118l1.518
                            4.674c.3.921-.755 1.688-1.54 1.118l-3.982-2.89a1
                            1 0 00-1.176 0l-3.982 2.89c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1
                            1 0 00-.364-1.118l-3.982-2.89c-.784-.57-.38-1.81.588-1.81h4.924a1
                            1 0 00.95-.69l1.518-4.674z" />
                        </svg>
                    ))}
                </div>

                {/* Numeric rating and review count */}
                <span className='text-grey-700 text-sm'>
                    {rating.rate ? rating.rate.toFixed(1) : 'No Rating'}
                    <span className='text-grey-500'> ({rating.count || 0} Reviews)</span>
                </span>
            </div>

            {/* Schema.org structured data for rich snippets in search results */}
            <Helmet>
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org/",
                            "@type": "Product",
                            "name": "${product.title}",
                            "image": "${product.image}",
                            "description": "${product.description.replace(/"/g, '\\"')}",
                            "category": "${product.category}",
                            ${product.brand ? `"brand": {
                                "@type": "Brand",
                                "name": "${product.brand}"
                            },` : ''}
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "${rating.rate.toFixed(1)}",
                                "reviewCount": "${rating.count}",
                                "bestRating": "5",
                                "worstRating": "1"
                            },
                            "offers": {
                                "@type": "Offer",
                                "url": "${window.location.href}",
                                "priceCurrency": "USD",
                                "price": "${product.price.toFixed(2)}",
                                "availability": "https://schema.org/InStock"
                            }
                        }
                    `}
                </script>
            </Helmet>
        </>
    );
}