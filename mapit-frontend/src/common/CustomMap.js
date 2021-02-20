import { useContext } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styled from "styled-components";
import PlaceSearch from "./PlaceSearch";
import { PlacesContext } from "../context/PlacesProvider";

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const URL = `${process.env.REACT_APP_MAPBOX_URL}${ACCESS_TOKEN}`;
const ATTRIBUTION = process.env.REACT_APP_OSM_MAPBOX_ATTRIBUTION;

export default function CustomMap({
  places,
  testPlaces,
  dispatchTest,
  dispatch,
}) {
  const userPlaces = useContext(PlacesContext);

  return (
    <MapContainerStyled
      className="leaflet-container"
      center={[53.551086, 9.993682]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer url={URL} attribution={ATTRIBUTION} />
      <PlaceSearch
        dispatchTest={dispatchTest}
        testPlaces={testPlaces}
        dispatch={dispatch}
      />
      {places.map((place) => {
        if (place.related) {
          return (
            <Marker
              key={place.id}
              position={[place.latitude, place.longitude]}
            />
          );
        } else {
          return null;
        }
      })}
    </MapContainerStyled>
  );
}

const MapContainerStyled = styled(MapContainer)`
  position: absolute;
  width: 100%;
  height: 80vh;
  top: 66px;
`;
