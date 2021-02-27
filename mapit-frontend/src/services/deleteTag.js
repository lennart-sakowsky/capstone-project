import axios from "axios";
import authHeader from "./authHeader";

export default function deleteTag(tagId, placeId) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const defaultHeader = authHeader();
  const options = {
    method: "delete",
    url: `${baseUrl}/tag/${tagId}/place/${placeId}`,
    headers: defaultHeader,
  };
  return axios(options).then((response) => response.data);
}
