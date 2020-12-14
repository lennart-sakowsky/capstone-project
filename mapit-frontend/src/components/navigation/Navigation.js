import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchTagInput from "./../SearchTagInput";
import Logout from "./../Logout";

export default function Navigation({ updateTaggedPlaces }) {
  return (
    <NavBar>
      <NavList>
        <NavListItem>
          <LinkStyled to={"/places"}>P</LinkStyled>
        </NavListItem>
        <NavListItem>
          <SearchTagInput onUpdateTaggedPlaces={updateTaggedPlaces} />
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
  list-style: none;
  display: flex;
  justify-content: space-around;
`;

const NavListItem = styled.li`
  color: white;
`;
