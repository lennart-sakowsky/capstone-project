export default async function getTaggedPlaces(tag) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(tag);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("http://mapit-backend.local/tag", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
}
