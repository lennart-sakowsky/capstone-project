import { Marker } from "react-leaflet";

export default function PlaceMarker({ taggedPlaces }) {
  return (
    <>
      {taggedPlaces.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
        ></Marker>
      ))}
    </>
  );
}
