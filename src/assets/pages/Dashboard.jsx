import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (document.getElementById("map")._leaflet_id) return;

    const map = L.map("map").setView([22.5726, 88.3639], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    L.marker([22.5726, 88.3639])
      .addTo(map)
      .bindPopup("🚑 Ambulance available")
      .openPopup();
  }, []);

  const handleBook = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient: "Sayantan",             // 🔹 must match an existing user name in DB
          pickupLocation: "Kolkata City Center",
          destination: "Apollo Hospital"   // 🔹 example hospital
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Ambulance booked successfully!");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ambulance Tracking</h2>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>

      <button
        onClick={handleBook}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          background: "#0077b6",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        🚑 Book Ambulance
      </button>

      {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
    </div>
  );
}

export default Dashboard;
