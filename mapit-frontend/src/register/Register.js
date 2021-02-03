import styled from "styled-components/macro";
import RegisterForm from "./RegisterForm";

export default function Register({ setToken }) {
  return (
    <>
      <Headline>Willkommen bei MapIt</Headline>
      <RegisterForm setToken={setToken} />
    </>
  );
}

const Headline = styled.h2`
  margin-top: 5.5rem;
  font-size: 1.8rem;
  text-align: center;
  color: #f5f9ff;
`;
