import styled from "styled-components";
import appLogo from "./../images/mapitLogo.svg";

export default function AllPlacesLink({ updateTaggedPlaces }) {
  return (
    <LogoStyled onClick={() => updateTaggedPlaces([])}>
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
