import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./App.css";
import PlaceSearch from "./components/PlaceSearch";
import PlaceDetailPage from "./components/PlaceDetailPage";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllPlacesPage from "./components/AllPlacesPage";

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`;
const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

function App() {
  const [currentPlace, setCurrentPlace] = useState({});
  const [taggedPlaces, setTaggedPlaces] = useState([]);

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
            <TileLayer url={URL} attribution={ATTRIBUTION} />
            <PlaceSearch
              updateCurrentPlace={setCurrentPlace}
              updateTaggedPlaces={setTaggedPlaces}
            />
            {taggedPlaces.map((place) => (
              <Marker
                key={place.id}
                position={[place.latitude, place.longitude]}
              />
            ))}
          </MapContainer>
          <Navigation updateTaggedPlaces={setTaggedPlaces} />
        </Route>
        <Route path="/info">
          <PlaceDetailPage
            currentPlace={currentPlace}
            updateCurrentPlace={setCurrentPlace}
          />
        </Route>
        <Route path="/places">
          <AllPlacesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
