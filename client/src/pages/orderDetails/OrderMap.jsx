import * as L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const OrderMap = ({ order }) => {
  const shipping = [order.shippingAddress.lat, order.shippingAddress.lng];
  const live = [order.liveLocation.lat, order.liveLocation.lng];

  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-100 w-full"
      style={{ height: "300px" }}
    >
      <MapContainer
        center={shipping}
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

        {/* Shipping Address Marker */}
        <Marker position={shipping}>
          <Popup>
            <strong>Shipping Address</strong>
            <br />
            {order.shippingAddress.address}
          </Popup>
        </Marker>

        {/* Live Location Marker */}
        <Marker position={live}>
          <Popup>
            <strong>Live Location</strong>
            <br />
            Updated:{" "}
            {new Date(order.liveLocation.updatedAt).toLocaleTimeString()}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OrderMap;
