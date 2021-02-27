import axios from "axios";
import authHeader from "./authHeader";

export default function deleteUser() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const defaultHeader = authHeader();
  const options = {
    method: "delete",
    url: `${baseUrl}/logout`,
    headers: defaultHeader,
  };
  return axios(options).then((response) => response.data);
}
