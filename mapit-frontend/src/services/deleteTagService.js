export default async function deleteTagService(tagId, placeId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `http://mapit-backend.local/tag/${tagId}/place/${placeId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
}
