interface StarRatingProps {
    rating: 1 | 2 | 3 | 4 | 5 | number;
}

export function StarRating({ rating }: StarRatingProps) {
    const maxStars = 5;

    return (
        <div className="flex justify-center space-x-1">
            {[...Array(maxStars)].map((_, index) => (
                <span key={index} className={`cursor-pointer text-lg ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                    ★
                </span>
            ))}
        </div>
    );
}
