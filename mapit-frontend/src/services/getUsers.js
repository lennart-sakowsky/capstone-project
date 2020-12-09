export default function getUsers() {
  return fetch(process.env.REACT_APP_DATABASE_URL_USER).then((result) =>
    result.json()
  );
}
