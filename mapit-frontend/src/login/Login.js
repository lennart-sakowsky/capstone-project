import styled from "styled-components/macro";
import LoginForm from "./LoginForm";

export default function Login({ setToken, setData }) {
  return (
    <>
      <Headline>MapIt</Headline>
      <LoginForm setToken={setToken} setData={setData} />
    </>
  );
}

const Headline = styled.h2`
  margin-top: 5.5rem;
  font-size: xx-large;
  text-align: center;
  color: #f5f9ff;
`;
