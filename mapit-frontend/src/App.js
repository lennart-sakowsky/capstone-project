import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./App.css";
import PlaceSearch from "./components/PlaceSearch";
import PlaceDetailPage from "./components/PlaceDetailPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [currentPlace, setCurrentPlace] = useState({});

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
            <PlaceSearch updateCurrentPlace={setCurrentPlace} />
          </MapContainer>
        </Route>
        <Route path="/info">
          <PlaceDetailPage
            currentPlace={currentPlace}
            updateCurrentPlace={setCurrentPlace}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
