const StarRating = ({ rating }: { rating?: number }) => {
  if (rating) {
    const floatToInt = rating * 10;
    return (
      <div className="flex">
        {/* Full stars */}
        <span>
          {Array.from({ length: Math.floor(rating) }).map((_, index) => (
            <span key={index}>⭐</span>
          ))}
        </span>

        {/* Partial stars */}
        <span className="h-min overflow-hidden">
          <div
            style={{
              width: `${(floatToInt % 10) * 10}%`,
            }}
            className={`max-w-min overflow-hidden`}
          >
            ⭐
          </div>
        </span>
      </div>
    );
  } else return <p>Error..</p>;
};

export default StarRating;
