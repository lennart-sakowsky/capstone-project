import { Marker } from "react-leaflet";

export default function PlacesMarker({ allRelatedPlaces }) {
  return (
    <>
      {allRelatedPlaces.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
        ></Marker>
      ))}
    </>
  );
}
