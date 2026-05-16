import * as L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ lat/lng না থাকলে fallback map দেখাবো না
const NoMapState = ({ address }) => (
  <div className="rounded-2xl bg-white border border-gray-100 w-full h-[300px] flex flex-col items-center justify-center gap-3 text-center px-6">
    <div className="w-14 h-14 rounded-full bg-[#E8F0EA] flex items-center justify-center">
      <MapPin size={26} className="text-[#1B3022]" strokeWidth={1.6} />
    </div>
    <p className="text-[#1B3022] text-[14px] font-medium">
      Live tracking not available
    </p>
    {address && (
      <p className="text-[#6B7280] text-[13px] leading-relaxed max-w-60">
        {address}
      </p>
    )}
  </div>
);

const OrderMap = ({ order }) => {
  const lat = order?.shippingAddress?.lat;
  const lng = order?.shippingAddress?.lng;
  const address = order?.shippingAddress?.address;

  // ✅ coordinates না থাকলে crash করবে না
  if (!lat || !lng) {
    return (
      <div className="pb-6">
        <NoMapState address={address} />
      </div>
    );
  }

  const position = [lat, lng];

  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-100 w-full mb-6"
      style={{ height: "300px" }}
    >
      <MapContainer
        center={position}
        zoom={13}
        zoomControl={false}
        scrollWheelZoom={false}
        touchZoom={true}
        dragging={true}
        className="h-full w-full rounded-2xl overflow-hidden"
      >
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <strong>Shipping Address</strong>
            <br />
            {address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OrderMap;
