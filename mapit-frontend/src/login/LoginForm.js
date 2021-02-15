import styled from "styled-components/macro";
import { useState, useCallback, useReducer } from "react";
import { useHistory, NavLink } from "react-router-dom";
import FormInput from "../input/FormInput";
import { deleteToken, saveToken } from "../lib/localStorage";
import postingReducer from "../reducers/postingReducer";
import loginUser from "../services/loginUser";
import { postFailure, postInit, postSuccess } from "../actions/postingActions";

export default function LoginForm({ setLoggedIn }) {
  const [loginStatus, dispatchLoginStatus] = useReducer(postingReducer, {
    isPosting: false,
    isError: false,
  });
  const history = useHistory();
  const changeRoute = useCallback(() => history.push("/main"), [history]);
  const [loginData, setLoginData] = useState({
    user: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      {loginStatus.isPosting ? (
        <Message>Einen Moment bitte ...</Message>
      ) : (
        <>
          <Form>
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
              Anmelden
            </Button>
            <Small>
              Konto anlegen?
              <StyledNavLink to="/register">Registrieren</StyledNavLink>
            </Small>
          </Form>
          {loginStatus.isError && (
            <Message>Etwas ist schiefgegangen ...</Message>
          )}
        </>
      )}
    </>
  );

  function onSubmit(event) {
    event.preventDefault();
    const {
      user: { email, password },
    } = loginData;
    dispatchLoginStatus({ type: postInit });
    if (email.length && password.length > 8) {
      deleteToken();
      loginUser(loginData.user).then((data) => {
        if (data.success === false) {
          dispatchLoginStatus({ type: postFailure });
        } else {
          saveToken(data);
          dispatchLoginStatus({ type: postSuccess });
          setLoggedIn(true);
          changeRoute();
        }
      });
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
  bottom: 8.5rem;
  font-weight: 500;
  color: #f5f9ff;
`;

const Button = styled.button`
  width: auto;
  margin: 7.2rem 0rem 6rem;
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
  margin-left: 1.5rem;
  text-decoration: none;
  color: #3535de;
`;
