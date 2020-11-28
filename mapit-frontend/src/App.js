import getUsers from "./services/getUsers";

function App() {
  function createUser(event) {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: "Sieglinde Seelenwerfer",
      email: "throw@catch.com",
      password: "frisbee",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://mapit-backend.local/user", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  function getAllUsers() {
    getUsers().then((users) => console.log(users));
  }

  return (
    <>
      <button onClick={createUser}>Create a user</button>
      <button onClick={getAllUsers}>Show all users</button>
    </>
  );
}

export default App;
