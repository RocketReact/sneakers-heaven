
export  default function generateProductURL(product) {
    if (!product || !product.title) return `/product/${product.id}`;

    const words = product.title
        .split(' ')
        .slice(0,4)
        .join('-')
        .toLowerCase()
    return `/product/${product.id}/${words}`;
}

