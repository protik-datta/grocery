import { useState } from "react";
import { assets } from "../../assets/assets";
import { useEffect } from 'react';

const ReviewInput = ({ product, onSubmit }) => {
  const [selectedStar, setSelectedStar] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleReset = () => {
    setSubmitted(false);
    setSelectedStar(0);
    setName("");
    setComment("");
    setErrors({});
  };

  useEffect(() => {
    let timer;

    if (submitted) {
      timer = setTimeout(() => {
        handleReset();
      }, 2000);
    }

    return ()=> clearTimeout(timer);
  }, [submitted]);

  const starLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  const validate = () => {
    const newErrors = {};
    if (!selectedStar) newErrors.star = "Please select a rating.";
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!comment.trim()) newErrors.comment = "Review comment is required.";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const review = {
      _id: Date.now().toString(),
      user: name.trim(),
      rating: selectedStar,
      comment: comment.trim(),
      helpful: 0,
      createdAt: new Date().toISOString(),
    };

    onSubmit?.(review);
    setSubmitted(true);
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
        {/* Star Rating — click to fill only, no hover effect */}
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
                  onClick={() => {
                    setSelectedStar(star);
                    setErrors((e) => ({ ...e, star: undefined }));
                  }}
                  className="cursor-pointer"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
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
            <p className="text-red-500 text-[12px] leading-4">{errors.star}</p>
          )}
        </div>

        {/* Name Input — compact fixed width */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="review-name"
            className="text-[#1B3022] text-[13px] font-medium leading-5"
          >
            Your Name
          </label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((err) => ({ ...err, name: undefined }));
            }}
            placeholder="e.g. John Doe"
            className={`w-56 h-9 px-3 rounded-lg border text-[13px] text-[#1B3022] placeholder:text-[#52525C]/35 bg-white/70 outline-none transition-all duration-200 focus:ring-[#1B3022] focus:border-[#1B3022] ${
              errors.name
                ? "border-red-300 focus:ring-red-100"
                : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-[12px] leading-4">{errors.name}</p>
          )}
        </div>

        {/* Comment Textarea — compact max-width */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="review-comment"
            className="text-[#1B3022] text-[13px] font-medium leading-5"
          >
            Your Review
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setErrors((err) => ({ ...err, comment: undefined }));
            }}
            placeholder="Share your experience with this product..."
            rows={4}
            className={`w-full max-w-sm px-3 py-2.5 rounded-lg border text-[13px] text-[#1B3022] placeholder:text-[#52525C]/35 bg-white/70 outline-none resize-none transition-all duration-200 focus:ring-[#1B3022] focus:border-[#1B3022] ${
              errors.comment
                ? "border-red-300 focus:ring-red-100"
                : "border-gray-200"
            }`}
          />
          <div className="flex items-center justify-between max-w-sm">
            {errors.comment ? (
              <p className="text-red-500 text-[12px] leading-4">
                {errors.comment}
              </p>
            ) : (
              <span />
            )}
            <span
              className={`text-[11px] leading-4 ${
                comment.length > 500 ? "text-red-400" : "text-[#52525C]/40"
              }`}
            >
              {comment.length}/500
            </span>
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-9 px-5 rounded-lg bg-[#1B3022] text-white text-[13px] font-medium cursor-pointer transition-all duration-200 hover:bg-[#1B3022]/85 active:scale-[0.98]"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewInput;
