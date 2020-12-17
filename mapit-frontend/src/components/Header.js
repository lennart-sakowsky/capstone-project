import styled from "styled-components/macro";
import mapitLogo from "../images/mapitLogo.svg";

export default function Header() {
  return (
    <StyledHeader>
      <Headline>MapIt</Headline>
      <LogoImage src={mapitLogo} alt=""></LogoImage>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
`;

const Headline = styled.h1`
  margin-top: 0.9rem;
  margin-bottom: 0;
  font-weight: 700;
  font-size: xx-large;
  line-height: 1.2;
  color: #f5f9ff;
`;

const LogoImage = styled.img`
  width: 6%;
  position: fixed;
  left: 237px;
  top: 10px;
`;
