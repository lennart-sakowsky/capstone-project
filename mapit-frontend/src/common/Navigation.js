import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchTagInput from "../input/SearchTagInput";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiListUl } from "react-icons/bi";
import useRequest from "../hooks/useRequest";

export default function Navigation({ updateTaggedPlaces }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [{ isLoading, isError }, makeRequest] = useRequest();
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
  function onDelete() {
    localStorage.removeItem("token");
    makeRequest("delete", `${baseUrl}/logout`).then((response) => {
      console.log(response);
      if (response.success === "Successfully logged out of application.") {
        console.log("Logged out");
      }
    });
  }
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
