import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapDashboard = () => {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {

    try {

      const department = localStorage.getItem("department");
      const zone = localStorage.getItem("zone");

      const res = await axios.get(
        "http://localhost:1300/api/Comp/department",
        {
          params: {
            category: department,
            zone: zone
          }
        }
      );

      setComplaints(res.data);

    } catch (error) {

      console.error("Error fetching complaints:", error);

    }

  };

  const getMarkerColor = (status) => {

    if (status === "Resolved") return "green";
    if (status === "In Progress") return "orange";

    return "red";
  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Department Complaints Map</h2>

      <MapContainer
        center={[21.1702, 72.8311]}
        zoom={12}
        style={{ height: "600px", borderRadius: "10px" }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {complaints.map((c) => (

          c.latitude && c.longitude && (

            <Marker
              key={c._id}
              position={[c.latitude, c.longitude]}
            >

              <Popup>

                <h4>{c.category}</h4>

                <p>{c.description}</p>

                <p><b>Location:</b> {c.location}</p>

                <p style={{ color: getMarkerColor(c.status) }}>
                  <b>Status:</b> {c.status}
                </p>

              </Popup>

            </Marker>

          )

        ))}

      </MapContainer>

    </div>

  );
};

export default MapDashboard;