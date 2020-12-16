import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchTagInput from "./../SearchTagInput";
import AllPlacesLink from "./../AllPlacesLink";
import Logout from "./../Logout";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiListUl } from "react-icons/bi";

export default function Navigation({ updateTaggedPlaces }) {
  return (
    <NavBar>
      {/* <NavList>
        <NavListItem> */}
      <Link to={"/places"}>
        <BiListUl onClick={() => updateTaggedPlaces([])} />
        {/* <AllPlacesLink updateTaggedPlaces={updateTaggedPlaces} /> */}
      </Link>
      {/* </NavListItem>
        <NavListItem> */}
      <SearchTagInput updateTaggedPlaces={updateTaggedPlaces} />
      {/* </NavListItem>
        <NavListItem> */}
      <Link to={"/"}>
        {/* <Logout /> */}
        <RiLogoutBoxRLine />
      </Link>
      {/* </NavListItem>
      </NavList> */}
    </NavBar>
  );
}

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  position: fixed;
  bottom: 10px;
  left: 27px;
  right: 27px;

  a svg {
    width: 2em;
    height: 2em;
    fill: aliceblue;
  }
`;
