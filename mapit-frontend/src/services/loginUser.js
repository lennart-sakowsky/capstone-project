import axios from "axios";

export default function loginUser(body) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const options = {
    method: "post",
    url: `${baseUrl}/login`,
    headers: {
      "content-type": "application/json",
    },
    data: body,
  };
  return axios(options).then((response) => response.data);
}
