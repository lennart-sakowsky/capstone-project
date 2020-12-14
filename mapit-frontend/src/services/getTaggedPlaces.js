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

  try {
    const response = await fetch(
      "http://mapit-backend.local/tag",
      requestOptions
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
