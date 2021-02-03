import styled from "styled-components/macro";
import LoginForm from "./LoginForm";

export default function Login({ setToken }) {
  return (
    <>
      <Headline>Willkommen zurück</Headline>
      <LoginForm setToken={setToken} />
    </>
  );
}

const Headline = styled.h2`
  margin-top: 5.5rem;
  font-size: xx-large;
  text-align: center;
  color: #f5f9ff;
`;
