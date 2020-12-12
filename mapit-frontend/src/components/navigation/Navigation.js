import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchTagInput from "./../SearchTagInput";

export default function Navigation() {
  return (
    <NavBar>
      <NavList>
        <NavListItem>
          <Link>P</Link>
        </NavListItem>
        <NavListItem>
          <Link>
            <SearchTagInput />
          </Link>
        </NavListItem>
        <NavListItem>
          <Link>T</Link>
        </NavListItem>
      </NavList>
    </NavBar>
  );
}

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
