import styled from "styled-components/macro";
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";

export default function Login({ setLoggedIn }) {
  return (
    <>
      <Headline>MapIt</Headline>
      <LoginForm setLoggedIn={setLoggedIn} />
    </>
  );
}

const Headline = styled.h2`
  margin-top: 5.5rem;
  font-size: xx-large;
  text-align: center;
  color: #f5f9ff;
`;

Login.propTypes = {
  setLoggedIn: PropTypes.func,
};
