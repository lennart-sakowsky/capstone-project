import { useReducer, useCallback } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import SearchTagInput from "../input/SearchTagInput";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiListUl } from "react-icons/bi";
import deleteReducer from "../reducers/deleteReducer";
import deleteUser from "../services/deleteUser";
import {
  deleteInit,
  deleteSuccess,
  deleteFailure,
} from "../actions/deleteActions";

export default function Navigation() {
  const [logoutStatus, dispatchLogoutStatus] = useReducer(deleteReducer, {
    isLoading: false,
    isError: false,
  });
  const history = useHistory();
  const changeRoute = useCallback(() => history.push("/login"), [history]);

  const onDelete = () => {
    dispatchLogoutStatus({ type: deleteInit });
    deleteUser().then((response) => {
      if (response.success === "Successfully logged out of application.") {
        dispatchLogoutStatus({ type: deleteSuccess });
        localStorage.removeItem("token");
        changeRoute();
      } else {
        dispatchLogoutStatus({ type: deleteFailure });
      }
    });
  };

  return (
    <NavBar>
      <Link to={"/places"}>
        <BiListUl />
      </Link>
      <SearchTagInput />
      <div>
        <RiLogoutBoxRLine onClick={() => onDelete()} />
      </div>
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

  a svg,
  div svg {
    width: 1.5em;
    height: 1.5em;
    fill: aliceblue;
  }
`;
