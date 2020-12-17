import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import Logo from "./Logo";

export default function Landing() {
  const history = useHistory();
  const changeRoute = useCallback(() => history.push("/main"), [history]);
  /* setTimeout(changeRoute(), 4000); */

  return (
    <StyledDiv onClick={changeRoute}>
      <Logo />
      <Headline>MapIt</Headline>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Headline = styled.h1`
  margin-top: 0.9rem;
  margin-bottom: 0;
  font-weight: 700;
  font-size: xx-large;
  line-height: 1.2;
  color: #dadfe8;
`;
