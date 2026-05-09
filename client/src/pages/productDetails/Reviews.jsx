import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { ThumbsUpFilled } from "../../lib/Icons";
import { MessageSquareDashed } from "lucide-react";

const Reviews = ({ product }) => {
  const [reviews, setReviews] = useState(
    product.reviews.map((r) => ({ ...r, liked: false })),
  );

  useEffect(() => {
    setReviews(product.reviews.map((r) => ({ ...r, liked: false })));
  }, [product.reviews]);

  const handleHelpful = (reviewId) => {
    setReviews((prev) =>
      prev.map((review) =>
        review._id === reviewId
          ? {
              ...review,
              liked: !review.liked,
              helpful: review.liked ? review.helpful - 1 : review.helpful + 1,
            }
          : review,
      ),
    );
  };

  return (
    <div className="p-4 md:p-8 mb-6 md:mb-10 space-y-8 md:space-y-10">
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => {
          const formattedDate = new Date(review.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          );

          return (
            <div key={review._id} className="flex items-start gap-3 md:gap-4">
              <span className="shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#1B3022]/10 text-[#1B3022] text-[13px] font-semibold">
                {review.user
                  .split(" ")
                  .map((n) => n.charAt(0).toUpperCase())
                  .slice(0, 2)
                  .join("")}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  <h4 className="text-[#1B3022] text-[14px] font-semibold leading-5">
                    {review.user}
                  </h4>
                  <p className="text-[#52525C] text-[12px]">·</p>
                  <p className="text-[#52525C] text-[12px] leading-4">
                    {formattedDate}
                  </p>
                </div>

                <div className="flex py-2 gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <img
                      key={index}
                      src={
                        index < review.rating ? assets.star : assets.blank_star
                      }
                      alt="rating"
                      className="w-3.5 h-3.5"
                    />
                  ))}
                </div>

                <p className="text-[#52525C] text-[14px] font-normal leading-5">
                  {review.comment}
                </p>

                <button
                  className="flex items-center gap-2 py-2 cursor-pointer"
                  onClick={() => handleHelpful(review._id)}
                >
                  {review.liked ? (
                    <ThumbsUpFilled className="w-4 h-4 text-[#1B3022]" />
                  ) : (
                    <img
                      src={assets.thumbs_up}
                      alt="thumbs up"
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  <span className="text-[#52525C] text-[12px]">
                    Helpful ({review.helpful})
                  </span>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center gap-3 py-10 sm:py-14 md:py-16 px-4">
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#1B3022]/8">
            <MessageSquareDashed className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#1B3022]/40" />
          </div>
          <div className="text-center">
            <h4 className="text-[#1B3022] text-[15px] sm:text-[16px] font-semibold leading-6">
              No reviews yet
            </h4>
            <p className="text-[#52525C] text-[13px] sm:text-[14px] leading-5 mt-1">
              Be the first to review this product!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
