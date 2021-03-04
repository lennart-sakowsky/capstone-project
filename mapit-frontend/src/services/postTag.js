import axios from "axios";
import { loadToken } from "./localStorage";

export default function postTag(body, getToken = loadToken) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const options = {
    method: "post",
    url: `${baseUrl}/tag`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-type": "application/json",
    },
    data: body,
  };
  return axios(options).then((response) => response.data);
}
