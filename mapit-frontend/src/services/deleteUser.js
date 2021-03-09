import axios from "axios";
import { loadToken } from "./localStorage";

export default function deleteUser(getToken = loadToken) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const options = {
    method: "delete",
    url: `${baseUrl}/logout`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-type": "application/json",
    },
  };
  return axios(options).then((response) => response.data);
}
