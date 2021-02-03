import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchTagInput from "../input/SearchTagInput";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiListUl } from "react-icons/bi";
import useCustomRequest from "../hooks/useCustomRequest";

export default function Navigation({ updateTaggedPlaces }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { isLoading, isError, deleteUser } = useCustomRequest();

  const onDelete = async () => {
    localStorage.removeItem("token");
    const response = await deleteUser(baseUrl);
    if (response.success === "Successfully logged out of application.") {
      console.log("Logged out");
    }
  };

  return (
    <NavBar>
      <Link to={"/places"}>
        <BiListUl onClick={() => updateTaggedPlaces([])} />
      </Link>
      <SearchTagInput updateTaggedPlaces={updateTaggedPlaces} />
      <Link to={"/login"}>
        <RiLogoutBoxRLine onClick={() => onDelete()} />
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
