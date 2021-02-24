import axios from "axios";
import authHeader from "./authHeader";

export default function postTag(body) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const defaultHeader = authHeader();
  const options = {
    method: "post",
    url: `${baseUrl}/tag`,
    headers: defaultHeader,
    data: body,
  };
  return axios(options).then((response) => response.data);
}
