import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export default function PlaceInfo({ currentPlace }) {
  return (
    <FormWrapper>
      {JSON.stringify(currentPlace)}
      <h2>Karlsons</h2>
      <h3>Alter Steinweg 10</h3>
      <h3>20459 Hamburg</h3>
      <Link to="/">
        <div>x</div>
      </Link>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 380px;
  font-family: sans-serif;

  margin: 0 auto;
`;
