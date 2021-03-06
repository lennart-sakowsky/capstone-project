import { MapContainer, TileLayer, Marker } from "react-leaflet";
import styled from "styled-components";
import PlaceSearch from "./PlaceSearch";
import PropTypes from "prop-types";

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const URL = `${process.env.REACT_APP_MAPBOX_URL}${ACCESS_TOKEN}`;
const ATTRIBUTION = process.env.REACT_APP_OSM_MAPBOX_ATTRIBUTION;

export default function CustomMap({ filteredPlaces, places }) {
  return (
    <MapContainerStyled
      className="leaflet-container"
      center={[53.551086, 9.993682]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer url={URL} attribution={ATTRIBUTION} />
      <PlaceSearch places={places} />
      {filteredPlaces.map((place) =>
        place.related ? (
          <Marker key={place.id} position={[place.latitude, place.longitude]} />
        ) : null
      )}
    </MapContainerStyled>
  );
}

const MapContainerStyled = styled(MapContainer)`
  position: absolute;
  width: 100%;
  height: 80vh;
  top: 66px;
`;

CustomMap.propTypes = {
  filteredPlaces: PropTypes.array,
  places: PropTypes.object,
};
