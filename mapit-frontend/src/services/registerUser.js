import axios from "axios";

export default function registerUser(body) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const options = {
    method: "post",
    url: `${baseUrl}/user`,
    data: body,
  };
  return axios(options).then((response) => response.data);
}
