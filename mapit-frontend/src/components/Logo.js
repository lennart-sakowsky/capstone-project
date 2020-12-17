import styled from "styled-components/macro";
import appLogo from "../images/mapitLogo.svg";

export default function Logo() {
  return (
    <LogoStyled>
      <LogoImage src={appLogo} alt=""></LogoImage>
    </LogoStyled>
  );
}

const LogoStyled = styled.div`
  text-align: center;
`;

const LogoImage = styled.img`
  width: 70%;
`;
