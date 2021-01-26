import styled from "styled-components/macro";
import { useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import FormInput from "../input/FormInput";
import useFetch from "../hooks/useFetch";

export default function LoginForm({ setToken }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const history = useHistory();
  const changeRoute = useCallback(() => history.push("/main"), [history]);
  const loginApi = useFetch(`${baseUrl}/login`);
  const [loginData, setLoginData] = useState({
    user: {
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
          <Span>Registrieren</Span>
        </Small>
      </Form>
    </>
  );

  function onSubmit(event) {
    event.preventDefault();
    const {
      user: { email, password },
    } = loginData;

    if (email && password.length > 8) {
      localStorage.removeItem("token");
      loginData.submitted = true;
      loginApi.post(loginData.user).then((data) => {
        setToken(data);
        if (data.value) {
          changeRoute();
        }
      });
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
  gap: 1.5rem;
  max-width: 380px;
  margin: 8rem 5rem;
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

const Button = styled.button`
  width: auto;
  margin: 4rem 0rem 6.5rem;
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
  margin-left: 1.5rem;
  color: #3535de;
`;
