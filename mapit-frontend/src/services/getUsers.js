export default function getUsers() {
  return fetch("http://mapit-backend.local/user").then((result) =>
    result.json()
  );
}
