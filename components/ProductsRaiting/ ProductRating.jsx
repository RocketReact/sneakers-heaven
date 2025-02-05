export default function ProductRating ({rating}) {
    const maxStars = 5;

    return (
        <div className="flex items-center mb-4">
            {[...Array(maxStars)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(rating.rate)? 'text-yellow-400' : 'text-gray-300'} `}
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
            <span className='ml-2 text-grey-700 text-sm'> {rating.rate ? rating.rate.toFixed(1) : 'No Rating'}

            </span>

        </div>
    );
}
