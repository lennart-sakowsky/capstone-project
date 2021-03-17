import axios from "axios";
import { loadToken } from "./localStorage";

export default function getPlaces(getToken = loadToken) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const options = {
    method: "get",
    url: `${baseUrl}/place`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-type": "application/json",
    },
  };
  return axios(options).then((response) => response.data);
}
