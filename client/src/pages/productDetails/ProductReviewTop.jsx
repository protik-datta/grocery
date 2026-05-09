import { assets } from "../../assets/assets";

const ProductReviewTop = ({ product }) => {
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product?.reviews?.filter((review) => review.rating === star).length,
  }));

  return (
    <div className="pb-5">
      <div className="flex flex-col md:flex-row items-start px-4 md:pl-10 rounded-2xl py-10">
        {/* left side */}
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center gap-2 py-4 md:py-12">
          <h2 className="text-[#1B3022] text-[48px] font-semibold leading-12">
            {product.rating}
          </h2>
          <div className="flex">
            {[...Array(Math.round(product.rating))].map((_, index) => (
              <img
                key={index}
                src={assets.star}
                alt="rating"
                className="w-4 h-4"
              />
            ))}
          </div>
          <span className="text-[#52525C] text-[14px] font-normal leading-5">
            {product.reviewCount} reviews
          </span>
        </div>

        {/* right side */}
        <div className="w-full md:w-2/3 py-4 md:py-8 px-4 md:px-10 flex flex-col justify-center gap-3">
          {ratingBreakdown.map(({ star, count }) => {
            const pct =
              product.reviewCount > 0 ? (count / product.reviewCount) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-[12px] text-gray-500 w-3 text-right">
                  {star}
                </span>
                <img src={assets.star} alt="star" className="w-3 h-3" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[12px] text-gray-400 w-3">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200" />
    </div>
  );
};

export default ProductReviewTop;
