import styled from "styled-components/macro";
import mapitLogo from "../images/mapitLogo.svg";

export default function Logo() {
  return (
    <LogoStyled>
      <LogoImage src={mapitLogo} alt=""></LogoImage>
    </LogoStyled>
  );
}

const LogoStyled = styled.div`
  text-align: center;
  margin-bottom: 3.2rem;
`;

const LogoImage = styled.img`
  width: 70%;
`;
