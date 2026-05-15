const Loader = ({ size = "md", fullScreen = false }) => {
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-11 w-11 border-[3px]",
  };

  // sm: inline inside buttons — bare spinner, white on dark bg
  if (size === "sm") {
    return (
      <div
        className={`rounded-full animate-spin shrink-0 ${sizeMap.sm}`}
        style={{
          borderColor: "rgba(255,255,255,0.25)",
          borderTopColor: "#ffffff",
        }}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen w-full" : "h-full w-full"
      }`}
    >
      <div
        className={`rounded-full animate-spin ${sizeMap[size]}`}
        style={{
          borderColor: "#E8F0EA",
          borderTopColor: "#1B3022",
        }}
      />
    </div>
  );
};

export default Loader;
