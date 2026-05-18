import { toast } from "react-hot-toast";

const baseStyle = {
  borderRadius: "10px",
  padding: "12px 16px",
  fontSize: "14px",
};

export const showSuccess = (message) => {
  toast.success(message, {
    id: message,
    duration: 3000,
    style: {
      ...baseStyle,
      background: "#1f2937",
      color: "#fff",
    },
    iconTheme: {
      primary: "#22c55e",
      secondary: "#fff",
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    id: message,
    duration: 4000,
    style: {
      ...baseStyle,
      background: "#1f2937",
      color: "#fff",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  });
};

export const showLoading = (message = "Loading...") => {
  return toast.loading(message, {
    style: {
      ...baseStyle,
      background: "#1f2937",
      color: "#fff",
    },
  });
};

export const dismissToast = (id) => {
  toast.dismiss(id);
};
