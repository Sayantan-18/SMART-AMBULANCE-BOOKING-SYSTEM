import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function Map() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <MapContainer center={[22.5726, 88.3639]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* Example ambulance marker */}
        <Marker position={[22.5726, 88.3639]}>
          <Popup>🚑 Ambulance at Kolkata City Center</Popup>
        </Marker>

        {/* User location marker (blue) */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
              iconSize: [30, 30],
            })}
          >
            <Popup>📍 You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
