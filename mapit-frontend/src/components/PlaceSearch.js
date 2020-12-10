import { useState } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { useMap } from "react-leaflet";

export default function PlaceSearch() {
  const [places, setPlaces] = useState({
    name: "",
    street: "",
    zipcode: "",
    latitude: "",
    longitude: "",
  });

  const map = useMap();
  const searchControl = new ELG.Geosearch().addTo(map);
  const results = new L.LayerGroup().addTo(map);
  results.togglePopup();

  searchControl.on("results", function (data) {
    results.clearLayers();
    for (let i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

  searchControl.on("results", handleSearchResults);

  function handleSearchResults(data) {
    const newPlace = {
      name: data.text.split(",")[0],
      street: data.text.split(", ")[1],
      zipcode: `${data.text.split(", ")[2]} ${data.text.split(", ")[3]}`,
      latitude: `${data.latlng.lat}`,
      longitude: `${data.latlng.lng}`,
    };
    setPlaces(newPlace);
    findPlace(places);
    console.log(newPlace);
  }

  function findPlace(places) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: places.name,
      street: places.street,
      zipcode: places.zipcode,
      latitude: places.latitude,
      longitude: places.longitude,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch("http://mapit-backend.local/place", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result));
  }

  return null;
}
