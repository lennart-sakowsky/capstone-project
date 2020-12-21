import styled from "styled-components/macro";
import { useState } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export default function LoginForm() {
  const history = useHistory();
  const changeRoute = useCallback(() => history.push("/main"), [history]);
  const [userProfile, setUserProfile] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label>
          <input
            type="text"
            name="email"
            placeholder="E-Mail"
            onChange={handleChange}
          />
        </Label>

        <Label>
          <input
            type="password"
            name="password"
            placeholder="Passwort"
            onChange={handleChange}
          />
        </Label>
        <Button onClick={handleClick}>Anmelden</Button>
        <Small>
          Konto anlegen?
          <Span>Registrieren</Span>
        </Small>
      </Form>
    </>
  );

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    setUserProfile();
  }

  function handleClick(event) {
    event.preventDefault();
    changeRoute();
  }
}

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  max-width: 380px;
  margin: 8rem 5rem;
`;

const Label = styled.label`
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
