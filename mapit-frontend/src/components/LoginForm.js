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
      <FormStyled>
        <StyledInput
          type="text"
          name="email"
          placeholder="E-Mail"
          onChange={handleChange}
        />
        <StyledInput
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button onClick={handleClick}>Anmelden</Button>
        <small>
          Konto anlegen?
          <a>Registrieren</a>
        </small>
      </FormStyled>
    </>
  );

  function handleChange(event) {
    setUserProfile();
  }

  function handleClick(event) {
    event.preventDefault();
  }
}

const FormStyled = styled.form`
  display: grid;
  max-width: 400px;
`;

const StyledInput = styled.div`
  display: block;
  transform: scale(1.4);

  input {
    border: 1px solid var(--blue-50);
    border-radius: 8px;
    padding: 2px 8px;
    font-weight: 100;
    font-size: 70%;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  background: #fe233ff7;
  color: #e8ebf0;
  box-shadow: 1px 2px 3px 1px #210835;
  font-size: 1.25rem;
  padding: 1rem 2rem;
`;
