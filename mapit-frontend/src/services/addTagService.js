export default async function addTagService(
  newTag,
  onUpdateAddedTags,
  inputValue
) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(newTag);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch("http://mapit-backend.local/tag", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      onUpdateAddedTags(inputValue);
    });
}
