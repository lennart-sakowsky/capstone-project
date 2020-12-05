import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";

function App() {
  return (
    <MapContainer
      center={[53.551086, 9.993682]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default App;
