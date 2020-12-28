export default async function getCurrentPlace(newPlace, updateCurrentPlace) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(newPlace);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(process.env.REACT_APP_PLACE_URL, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      updateCurrentPlace([...result]);
    });
}
