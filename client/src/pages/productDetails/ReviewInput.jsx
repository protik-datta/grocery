import { useState } from "react";
import { assets } from "../../assets/assets";
import { usePostReview } from "../../hooks/productApi.hook";
import { showError } from '../../utils/toast';

// Prop-e onSubmit add kora holo
const ReviewInput = ({ product, onSubmit }) => {
  const [selectedStar, setSelectedStar] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const { mutate: addReview, isPending } = usePostReview();

  const handleReset = () => {
    setSubmitted(false);
    setSelectedStar(0);
    setComment("");
    setErrors({});
  };

  const starLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  const validate = () => {
    const newErrors = {};
    if (!selectedStar) newErrors.star = "Please select a rating.";
    if (!comment.trim()) newErrors.comment = "Review comment is required.";
    if (comment.length < 3)
      newErrors.comment = "Review must be at least 3 characters.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      rating: selectedStar,
      comment: comment.trim(),
    };

    addReview(
      { productId: product._id, payload },
      {
        onSuccess: (response) => {
          // Response theke data nite hobe, na thakle optimistic update object
          const newReviewData = response?.data || {
            _id: Date.now().toString(),
            user: { name: "You" },
            rating: selectedStar,
            comment: comment.trim(),
            createdAt: new Date().toISOString(),
            helpful: 0,
          };

          // Parent-er handleNewReview function-ke call kora holo
          onSubmit?.(newReviewData);
          setSubmitted(true);
        },
        onError: (err) => {
          showError("Review submission failed");
        },
      },
    );
  };

  if (submitted) {
    return (
      <div className="px-4 md:px-8 py-10 md:py-14 flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1B3022]/10 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-[#1B3022]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div>
          <h4 className="text-[#1B3022] text-[15px] md:text-[16px] font-semibold leading-6">
            Review submitted!
          </h4>
          <p className="text-[#52525C] text-[13px] md:text-[14px] leading-5 mt-1">
            Thank you for sharing your feedback.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="mt-2 text-[13px] text-[#1B3022] font-medium underline underline-offset-2 cursor-pointer"
        >
          Write another review
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6 md:py-8">
      <h3 className="text-[#1B3022] text-[15px] md:text-[16px] font-semibold leading-6 mb-5 md:mb-6">
        Write a Review
      </h3>

      <div className="flex flex-col gap-5 max-w-lg">
        <div className="flex flex-col gap-2">
          <label className="text-[#1B3022] text-[13px] font-medium leading-5">
            Your Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const filled = star <= selectedStar;
              return (
                <button
                  key={star}
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    setSelectedStar(star);
                    setErrors((e) => ({ ...e, star: undefined }));
                  }}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  <img
                    src={filled ? assets.star : assets.blank_star}
                    alt=""
                    className="w-6 h-6 md:w-7 md:h-7"
                    style={{ filter: filled ? "none" : "opacity(0.3)" }}
                  />
                </button>
              );
            })}
            {selectedStar > 0 && (
              <span className="ml-2 text-[12px] text-[#52525C] leading-4">
                {starLabels[selectedStar]}
              </span>
            )}
          </div>
          {errors.star && (
            <p className="text-red-500 text-[12px]">{errors.star}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#1B3022] text-[13px] font-medium">
            Your Review
          </label>
          <textarea
            value={comment}
            disabled={isPending}
            onChange={(e) => {
              setComment(e.target.value);
              setErrors((err) => ({ ...err, comment: undefined }));
            }}
            placeholder="Share your experience..."
            rows={4}
            className={`w-full max-w-sm px-3 py-2.5 rounded-lg border text-[13px] outline-none ${
              errors.comment ? "border-red-300" : "border-gray-200"
            }`}
          />
          <div className="flex justify-between max-w-sm">
            {errors.comment && (
              <p className="text-red-500 text-[12px]">{errors.comment}</p>
            )}
            <span className="text-[11px] text-[#52525C]/40">
              {comment.length}/500
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={isPending}
          onClick={handleSubmit}
          className="h-9 w-max px-5 rounded-lg bg-[#1B3022] text-white text-[13px] font-medium disabled:bg-gray-400"
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewInput;
