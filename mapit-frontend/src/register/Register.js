import styled from "styled-components/macro";
import RegisterForm from "./RegisterForm";
import PropTypes from "prop-types";

export default function Register({ setLoggedIn }) {
  return (
    <>
      <Headline>MapIt</Headline>
      <RegisterForm setLoggedIn={setLoggedIn} />
    </>
  );
}

const Headline = styled.h2`
  margin-top: 5.5rem;
  font-size: xx-large;
  text-align: center;
  color: #f5f9ff;
`;

Register.propTypes = {
  setLoggedIn: PropTypes.func,
};
