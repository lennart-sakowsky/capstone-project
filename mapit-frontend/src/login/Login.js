import styled from "styled-components/macro";
import LoginForm from "./LoginForm";

export default function Login({ setToken, setData, setLoggedIn }) {
  return (
    <>
      <Headline>MapIt</Headline>
      <LoginForm
        setToken={setToken}
        setData={setData}
        setLoggedIn={setLoggedIn}
      />
    </>
  );
}

const Headline = styled.h2`
  margin-top: 5.5rem;
  font-size: xx-large;
  text-align: center;
  color: #f5f9ff;
`;
