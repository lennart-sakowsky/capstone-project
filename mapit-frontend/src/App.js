import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import PlaceSearch from "./components/PlaceSearch";
import PlaceInfo from "./components/PlaceInfo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
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
        </Route>
        <Route path="/info">
          <PlaceInfo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
