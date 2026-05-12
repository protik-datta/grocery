const axios = require("axios");

const getCoordinates = async ({ address, city, state, zip }) => {
  const fullAddress = `${address}, ${city}, ${state} ${zip}`;

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json&limit=1`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "grocery-app",
    },
  });

  if (!data.length) {
    throw new Error("Location not found");
  }

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
  };
};

module.exports = getCoordinates;
