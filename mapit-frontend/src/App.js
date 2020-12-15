import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";
import PlaceSearch from "./components/PlaceSearch";
import PlaceDetailPage from "./components/PlaceDetailPage";
import Navigation from "./components/navigation/Navigation";
/* import PlaceMarker from "./components/PlaceMarker"; */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllPlacesPage from "./components/AllPlacesPage";

function App() {
  const [currentPlace, setCurrentPlace] = useState({});
  const [taggedPlaces, setTaggedPlaces] = useState([]);
  const [activePlace, setActivePlace] = useState(null);

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
            {taggedPlaces.map((place) => (
              <Marker
                key={place.id}
                position={[place.latitude, place.longitude]}
                eventHandlers={{
                  click: () => {
                    setActivePlace(place);
                  },
                }}
              />
            ))}
            {activePlace && (
              <Popup
                position={[activePlace.latitude, activePlace.longitude]}
                onClose={() => {
                  setActivePlace(null);
                }}
              >
                <div>
                  <h3>{activePlace.name}</h3>
                  <p>{activePlace.street}</p>
                  <p>{activePlace.zipcode}</p>
                </div>
              </Popup>
            )}
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
