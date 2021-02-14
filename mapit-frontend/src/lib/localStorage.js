const saveToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const loadToken = () => {
  try {
    return JSON.parse(localStorage.getItem("token"));
  } catch (error) {
    console.log(error);
  }
};

const deleteToken = () => {
  localStorage.removeItem("token");
};

export { saveToken, loadToken, deleteToken };
