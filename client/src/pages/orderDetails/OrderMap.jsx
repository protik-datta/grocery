import * as L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

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
    <div className="rounded-2xl overflow-hidden">
      <MapContainer
        center={shipping}
        zoom={13}
        scrollWheelZoom={true}
        className="h-125 w-full z-0"
      >
        {/* map design */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* shipping address marker */}
        <Marker position={shipping}>
          <Popup>
            <div>
              <h2 className="font-bold">Shipping Address</h2>

              <p>{order.shippingAddress.address}</p>

              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
            </div>
          </Popup>
        </Marker>

        {/* live location marker */}
        <Marker position={live}>
          <Popup>
            <div>
              <h2 className="font-bold">Live Location</h2>

              <p>
                Updated:{" "}
                {new Date(order.liveLocation.updatedAt).toLocaleString()}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OrderMap;
