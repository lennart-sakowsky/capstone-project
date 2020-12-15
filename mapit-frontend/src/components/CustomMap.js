import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styled from "styled-components";
import PlaceSearch from "./PlaceSearch";

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`;
const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

export default function CustomMap({
  setCurrentPlace,
  setTaggedPlaces,
  taggedPlaces,
}) {
  return (
    <MapContainerStyled
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
        <Marker key={place.id} position={[place.latitude, place.longitude]} />
      ))}
    </MapContainerStyled>
  );
}

const MapContainerStyled = styled(MapContainer)`
  width: 100%;
  height: 90vh;
`;
