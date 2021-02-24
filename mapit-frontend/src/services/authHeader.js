import { loadToken } from "./localStorage";

export default function authHeader() {
  const token = loadToken();

  if (token && token.value) {
    return {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
}
