import { loadFromLocal } from "./localStorage";

export default function authHeader() {
  const token = loadFromLocal("token");

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
