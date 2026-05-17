import { showError } from "./toast";

export const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      const msg = "Geolocation is not supported by your browser";
      showError(msg);
      reject(new Error(msg));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        const msg =
          error.code === 1
            ? "Location permission denied. Please allow location access."
            : "Unable to retrieve location";

        showError(msg);
        reject(new Error(msg));
      },
    );
  });
};
