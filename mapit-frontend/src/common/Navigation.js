import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchTagInput from "../input/SearchTagInput";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiListUl } from "react-icons/bi";

export default function Navigation({ updateTaggedPlaces }) {
  return (
    <NavBar>
      <Link to={"/places"}>
        <BiListUl onClick={() => updateTaggedPlaces([])} />
      </Link>
      <SearchTagInput updateTaggedPlaces={updateTaggedPlaces} />
      <Link to={"/"}>
        <RiLogoutBoxRLine />
      </Link>
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
    width: 1.5em;
    height: 1.5em;
    fill: aliceblue;
  }
`;
