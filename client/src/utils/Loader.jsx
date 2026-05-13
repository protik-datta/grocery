const Loader = ({ size = "md", fullScreen = false }) => {
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  const spinner = (
    <div
      className={`border-white/30 border-t-white rounded-full animate-spin shrink-0 ${sizeMap[size]}`}
    />
  );

  // sm: inline use inside buttons — no wrapper div
  if (size === "sm") return spinner;

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen w-full" : "h-full w-full"
      }`}
    >
      <div
        className={`border-gray-200 border-t-blue-600 rounded-full animate-spin ${sizeMap[size]}`}
      />
    </div>
  );
};

export default Loader;
