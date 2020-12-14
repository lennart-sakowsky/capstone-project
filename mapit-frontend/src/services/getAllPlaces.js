export default async function getAllPlaces() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://mapit-backend.local/place",
      requestOptions
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
