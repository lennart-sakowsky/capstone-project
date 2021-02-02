import { useEffect } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { useMap } from "react-leaflet";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import useCustomRequest from "../services/useCustomRequest";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icons.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function PlaceSearch({
  updateCurrentPlace,
  updateTaggedPlaces,
}) {
  const map = useMap();
  const history = useHistory();
  const changeRoute = useCallback(() => history.push("/info"), [history]);
  const { isLoading, isError, postPlace } = useCustomRequest();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const searchControl = new ELG.Geosearch({
      position: "topright",
      placeholder: "Ort suchen",
    }).addTo(map);
    const results = new L.LayerGroup().addTo(map);
    results.togglePopup();

    searchControl.on("results", function (data) {
      results.clearLayers();
      updateTaggedPlaces([]);
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(
          L.marker(data.results[i].latlng).on("click", changeRoute)
        );
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

      postNewPlace(baseUrl, newPlace);
    }
    // eslint-disable-next-line
  }, []);

  async function postNewPlace(url, body) {
    const response = await postPlace(url, body);
    updateCurrentPlace([...response]);
  }

  return null;
}
