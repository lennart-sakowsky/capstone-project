import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchTagInput from "./../SearchTagInput";
import AllPlacesLink from "./../AllPlacesLink";
import Logout from "./../Logout";

export default function Navigation({ updateTaggedPlaces }) {
  return (
    <NavBar>
      <NavList>
        <NavListItem>
          <LinkStyled to={"/places"}>
            <AllPlacesLink updateTaggedPlaces={updateTaggedPlaces} />
          </LinkStyled>
        </NavListItem>
        <NavListItem>
          <SearchTagInput updateTaggedPlaces={updateTaggedPlaces} />
        </NavListItem>
        <NavListItem>
          <Link to={"/"}>
            <Logout />
          </Link>
        </NavListItem>
      </NavList>
    </NavBar>
  );
}

const LinkStyled = styled(Link)`
  color: white;
`;

const NavBar = styled.nav`
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const NavList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
`;

const NavListItem = styled.li`
  color: white;
`;
