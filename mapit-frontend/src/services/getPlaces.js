import axios from "axios";
import authHeader from "./authHeader";

export default function getPlaces() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const defaultHeader = authHeader();
  const options = {
    method: "get",
    url: `${baseUrl}/place`,
    headers: defaultHeader,
  };
  return axios(options).then((response) => response.data);
}
