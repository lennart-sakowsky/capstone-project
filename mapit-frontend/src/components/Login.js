import styled from "styled-components/macro";
import Logo from "./Logo";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <>
      {/* <Logo /> */}
      <Headline>Willkommen zurück</Headline>
      <LoginForm />
    </>
  );
}

const Headline = styled.h2`
  text-align: center;
  color: #f5f9ff;
`;
