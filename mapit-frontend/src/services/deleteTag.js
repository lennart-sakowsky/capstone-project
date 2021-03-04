import axios from "axios";
import { loadToken } from "./localStorage";

export default function deleteTag(tagId, placeId, getToken = loadToken) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const options = {
    method: "delete",
    url: `${baseUrl}/tag/${tagId}/place/${placeId}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "content-type": "application/json",
    },
  };
  return axios(options).then((response) => response.data);
}
