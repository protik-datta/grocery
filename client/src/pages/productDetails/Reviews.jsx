import { assets } from "../../assets/assets";
import { useHelpful } from "../../hooks/productApi.hook";
import { ThumbsUpFilled } from "../../lib/Icons";
import { MessageSquareDashed } from "lucide-react";
import { useAuth } from "../../store/useAuthStore";

const Reviews = ({ product }) => {
  const reviews = product?.reviews || [];
  const { user } = useAuth();

  const { mutate: markHelpful, isPending } = useHelpful(
    product?._id,
    user?._id,
  );

  return (
    <div className="p-4 md:p-8 mb-6 md:mb-10 space-y-8 md:space-y-10">
      {reviews.length > 0 ? (
        reviews.map((review) => {
          const formattedDate = new Date(review.createdAt).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          );

          const userName = review.user?.name || "Anonymous User";

          const isLikedByMe = Array.isArray(review.helpful)
            ? review.helpful.map(String).includes(String(user?._id))
            : false;

          const helpfulCount = Array.isArray(review.helpful)
            ? review.helpful.length
            : 0;

          return (
            <div key={review._id} className="flex items-start gap-3 md:gap-4">
              <span className="shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#1B3022]/10 text-[#1B3022] text-[13px] font-semibold">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  <h4 className="text-[#1B3022] text-[14px] font-semibold">
                    {userName}
                  </h4>
                  <p className="text-[#52525C] text-[12px]">
                    · {formattedDate}
                  </p>
                </div>

                <div className="flex py-2 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={i < review.rating ? assets.star : assets.blank_star}
                      className="w-3.5 h-3.5"
                    />
                  ))}
                </div>

                <p className="text-[#52525C] text-[14px] leading-5">
                  {review.comment}
                </p>

                <button
                  className={`flex items-center gap-2 py-2 cursor-pointer transition-all ${
                    isPending ? "opacity-50 pointer-events-none" : ""
                  }`}
                  disabled={isPending}
                  onClick={() => markHelpful(review._id)}
                >
                  {/* review.liked-er bodole isLikedByMe use holo */}
                  {isLikedByMe ? (
                    <ThumbsUpFilled className="w-4 h-4 text-[#1B3022]" />
                  ) : (
                    <img
                      src={assets.thumbs_up}
                      alt="thumbs up"
                      className="w-4 h-4 object-contain opacity-70"
                    />
                  )}
                  <span
                    className={`text-[12px] ${isLikedByMe ? "text-[#1B3022] font-semibold" : "text-[#52525C]"}`}
                  >
                    Helpful ({helpfulCount})
                  </span>
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center gap-3 py-10 px-4 text-center">
          <MessageSquareDashed className="w-12 h-12 text-[#1B3022]/40" />
          <h4 className="text-[#1B3022] font-semibold">No reviews yet</h4>
          <p className="text-gray-500 text-sm">
            Be the first to review this product!
          </p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
