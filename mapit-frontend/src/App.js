import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import PlaceSearch from "./components/PlaceSearch";

function App() {
  return (
    <MapContainer
      className="leaflet-container"
      center={[53.551086, 9.993682]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PlaceSearch />
    </MapContainer>
  );
}

export default App;
