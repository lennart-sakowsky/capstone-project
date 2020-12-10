import styled from "styled-components/macro";

export default function PlaceInfo() {
  return (
    <FormWrapper>
      <h2>Karlsons</h2>
      <h3>Alter Steinweg 10</h3>
      <h3>20459 Hamburg</h3>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: grid;
  gap: 1.25rem;
  max-width: 380px;
  font-family: sans-serif;
  z-index: 100;

  margin: 0 auto;
`;
