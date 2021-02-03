import styled from "styled-components/macro";
import { useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import FormInput from "../input/FormInput";
import useCustomRequest from "../hooks/useCustomRequest";

export default function RegisterForm({ setToken }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const history = useHistory();
  const changeRoute = useCallback(() => history.push("/main"), [history]);
  const { isLoading, isError, postRegisterUser } = useCustomRequest();
  const [loginData, setLoginData] = useState({
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    submitted: false,
  });

  return (
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

        {isError && <Div>Etwas ist schiefgegangen ...</Div>}
        {isLoading && <Div>Einen Moment bitte ...</Div>}

        <Button type="submit" label="Submit" onClick={onSubmit}>
          Registrieren
        </Button>
        <Small>
          Schon registriert?
          <Span>Anmelden</Span>
        </Small>
      </Form>
    </>
  );

  function onSubmit(event) {
    event.preventDefault();
    const {
      user: { firstName, lastName, email, password },
    } = loginData;

    if (firstName.length && lastName.length > 2) {
      if (email && password.length > 8) {
        localStorage.removeItem("token");
        loginData.submitted = true;
        getToken(baseUrl, loginData.user);
      }
    }
  }

  async function getToken(endpoint, user) {
    const token = await postRegisterUser(endpoint, user);
    setToken(token);
    console.log(token);
    if (token.value) {
      changeRoute();
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

const Div = styled.div`
  position: absolute;
  bottom: 15.6rem;
  font-weight: 500;
  color: #f5f9ff;
`;

const Button = styled.button`
  width: auto;
  margin: 4rem 0rem 5rem;
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

const Span = styled.span`
  margin-left: 1rem;
  color: #3535de;
`;
