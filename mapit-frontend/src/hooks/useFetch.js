import authHeader from "./../lib/authHeader";

export default function useFetch(endpoint) {
  const defaultHeader = authHeader();

  console.log(defaultHeader);

  const customFetch = (
    url,
    method = "GET",
    body = false,
    headers = defaultHeader
  ) => {
    const options = {
      method,
      headers,
    };
    if (body) options.body = JSON.stringify(body);

    return fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };
  const get = () => {
    return customFetch(endpoint);
  };
  const post = (body = false) => {
    if (!body) console.error("Für einen POST wird ein body benötigt.");
    return customFetch(endpoint, "POST", body);
  };
  const put = (body = false) => {
    if (!body) console.error("Für einen PUT wird ein body benötigt.");
    return customFetch(endpoint, "PUT", body);
  };
  const del = (tagId = false, placeId = false) => {
    if (!tagId || !placeId) {
      console.error("Um zu löschen, wird die ID von Tag und Ort benötigt.");
    }
    const url = `${endpoint}/${tagId}/place/${placeId}`;
    return customFetch(url, "DELETE");
  };
  return {
    get,
    post,
    put,
    del,
  };
}
