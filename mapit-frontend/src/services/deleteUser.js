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
  return axios(options)
    .then((response) => {
      if (response.status === 200) return response.data;
      if (response.status === 401 || response.status === 422) {
        const error = response.text();
        throw new Error(error);
      }
    })
    .catch((error) => console.log(error));
}
