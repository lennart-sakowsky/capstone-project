import styled from "styled-components/macro";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <>
      <Headline>Willkommen zurück</Headline>
      <LoginForm />
    </>
  );
}

const Headline = styled.h2`
  margin-top: 5.5rem;
  font-size: xx-large;
  text-align: center;
  color: #f5f9ff;
`;
