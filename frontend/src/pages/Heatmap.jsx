import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Heatmap() {
  const hotspots = [
    {
      city: "Delhi",
      position: [28.6139, 77.209],
      reports: 18,
    },
    {
      city: "Mumbai",
      position: [19.076, 72.8777],
      reports: 14,
    },
    {
      city: "Bangalore",
      position: [12.9716, 77.5946],
      reports: 11,
    },
    {
      city: "Lucknow",
      position: [26.8467, 80.9462],
      reports: 8,
    },
    {
      city: "Jaipur",
      position: [26.9124, 75.7873],
      reports: 6,
    },
    {
      city: "Hyderabad",
      position: [17.385, 78.4867],
      reports: 9,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 ">
      <h1 className="text-4xl font-bold mb-8">
        🗺 National Cyber Crime Heatmap
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-4">
        <MapContainer
          center={[22.9734, 78.6569]}
          zoom={5}
          style={{ height: "700px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {hotspots.map((city) => (
            <CircleMarker
              key={city.city}
              center={city.position}
              radius={city.reports}
              pathOptions={{
                color: "red",
                fillColor: "red",
                fillOpacity: 0.6,
              }}
            >
              <Popup>
                <h2 className="font-bold">{city.city}</h2>
                <p>Reports: {city.reports}</p>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Heatmap;
