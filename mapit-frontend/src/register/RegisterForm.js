import styled from "styled-components/macro";
import { useState, useCallback, useReducer } from "react";
import { useHistory, NavLink } from "react-router-dom";
import Loader from "react-loader-spinner";
import FormInput from "../input/FormInput";
import { saveToken, deleteToken } from "../services/localStorage";
import postingReducer from "../reducers/postingReducer";
import registerUser from "../services/registerUser";
import { postFailure, postInit, postSuccess } from "../actions/postingActions";
import PropTypes from "prop-types";

export default function RegisterForm({ setLoggedIn }) {
  const [loginStatus, dispatchLoginStatus] = useReducer(postingReducer, {
    isPosting: false,
    isError: false,
  });
  const history = useHistory();
  const changeRoute = useCallback(() => history.push("/main"), [history]);
  const [loginData, setLoginData] = useState({
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  return (
    <>
      {loginStatus.isError && <Message>Etwas ist schiefgegangen ...</Message>}
      {loginStatus.isPosting ? (
        <LoaderWrapper>
          <Loader type="TailSpin" color="#f5f9ff" height={80} width={80} />
        </LoaderWrapper>
      ) : (
        <>
          <Form>
            <Wrapper>
              <FormInput
                label=""
                name="firstName"
                type="text"
                value={loginData.user.firstName}
                onChange={handleChange}
                placeholder="Vorname"
              />
            </Wrapper>

            <Wrapper>
              <FormInput
                label=""
                name="lastName"
                type="text"
                value={loginData.user.lastName}
                onChange={handleChange}
                placeholder="Nachname"
              />
            </Wrapper>

            <Wrapper>
              <FormInput
                label=""
                name="email"
                type="text"
                value={loginData.user.email}
                onChange={handleChange}
                placeholder="E-Mail"
              />
            </Wrapper>

            <Wrapper>
              <FormInput
                label=""
                name="password"
                type="password"
                value={loginData.user.password}
                onChange={handleChange}
                placeholder="Passwort"
              />
            </Wrapper>

            <Button type="submit" label="Submit" onClick={onSubmit}>
              Registrieren
            </Button>
            <Small>
              Schon registriert?
              <StyledNavLink to="/login">Anmelden</StyledNavLink>
            </Small>
          </Form>
        </>
      )}
    </>
  );

  function onSubmit(event) {
    event.preventDefault();
    const {
      user: { firstName, lastName, email, password },
    } = loginData;
    dispatchLoginStatus({ type: postInit });
    if (firstName.length && lastName.length > 2) {
      if (email.length && password.length > 8) {
        deleteToken();
        registerUser(loginData.user).then((data) => {
          if (data.success === false) {
            dispatchLoginStatus({ type: postFailure });
          } else {
            saveToken(data);
            dispatchLoginStatus({ type: postSuccess });
            setLoggedIn(true);
            changeRoute();
          }
        });
      }
    } else {
      dispatchLoginStatus({ type: postFailure });
    }
  }

  function handleChange(event) {
    const { user } = loginData;
    user[event.target.name] = event.target.value;
    setLoginData({ user });
  }
}

const Form = styled.form`
  display: grid;
  gap: 1.2rem;
  max-width: 380px;
  margin: 5rem 5rem 4rem;
`;

const Wrapper = styled.div`
  grid-column: 1 / -1;
  width: 100%;
  text-align: center;
  margin: 0 auto;

  input {
    width: 74%;
    transform: scale(1.4);
    border: 1px solid var(--blue-50);
    border-radius: 8px;
    padding: 2px 8px;
    font-weight: 100;
    font-size: 70%;
  }
`;

const Message = styled.div`
  position: absolute;
  right: 5.5rem;
  bottom: 16.5rem;
  font-weight: 500;
  color: #f5f9ff;
`;

const Button = styled.button`
  width: auto;
  margin: 2rem 0rem 6rem;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  background: #fe233ff7;
  color: #e8ebf0;
  box-shadow: 1px 2px 3px 1px #210835;
`;

const Small = styled.small`
  font-weight: 600;
  color: #f5f9ff;
`;

const StyledNavLink = styled(NavLink)`
  margin-left: 1rem;
  text-decoration: none;
  color: #3535de;
`;

const LoaderWrapper = styled.div`
  padding-top: 20vh;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

RegisterForm.propTypes = {
  setLoggedIn: PropTypes.func,
};
