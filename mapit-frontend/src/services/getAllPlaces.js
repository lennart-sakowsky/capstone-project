export default async function getAllPlaces() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch("http://mapit-backend.local/place", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
}
