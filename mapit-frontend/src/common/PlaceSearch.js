import { useEffect, useContext } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { useMap } from "react-leaflet";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  PlacesContext,
  PlacesDispatchContext,
} from "../context/PlacesProvider";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icons.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function PlaceSearch() {
  const map = useMap();
  const history = useHistory();
  const changeRoute = useCallback(() => history.push("/info"), [history]);
  const userPlaces = useContext(PlacesContext);
  const setUserPlaces = useContext(PlacesDispatchContext);

  useEffect(() => {
    const searchControl = new ELG.Geosearch({
      position: "topright",
      placeholder: "Ort suchen",
    }).addTo(map);
    const results = new L.LayerGroup().addTo(map);
    results.togglePopup();

    searchControl.on("results", function (data) {
      results.clearLayers();
      setUserPlaces({ ...userPlaces, taggedPlaces: [] });
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(
          L.marker(data.results[i].latlng).on("click", changeRoute)
        );
      }
    });

    searchControl.on("results", handleSearchResults);

    function handleSearchResults(data) {
      const newPlace = [
        {
          name: data.text.split(",")[0],
          street: data.text.split(", ")[1],
          zipcode: `${data.text.split(", ")[2]} ${data.text.split(", ")[3]}`,
          latitude: `${data.latlng.lat}`,
          longitude: `${data.latlng.lng}`,
          tags: [],
          id: null,
        },
      ];
      const place = findPlace(newPlace[0]);
      place.length > 0
        ? setUserPlaces({ ...userPlaces, activePlace: [...place] })
        : setUserPlaces({ ...userPlaces, activePlace: [...newPlace] });
    }
    // eslint-disable-next-line
  }, []);

  function findPlace(newPlace) {
    const place = userPlaces.places.filter(
      (place) =>
        place.name === newPlace.name &&
        place.street === newPlace.street &&
        place.zipcode === newPlace.zipcode
    );
    return place;
  }

  return null;
}
