import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchTagInput from "./../SearchTagInput";

export default function Navigation({ updateAllPlaces, updateTaggedPlaces }) {
  const [data, setData] = useState([]);

  function handleClick() {
    updateAllPlaces(data);
  }

  useEffect(() => {
    const data = getAllPlaces();
    setData(data);
  }, []);

  async function getAllPlaces() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://mapit-backend.local/place",
        requestOptions
      );
      const json = await response.json();
      setData([...json]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <NavBar>
      <NavList>
        <NavListItem onClick={handleClick}>
          <LinkStyled to={"/places"}>P</LinkStyled>
        </NavListItem>
        <NavListItem>
          <SearchTagInput onUpdateTaggedPlaces={updateTaggedPlaces} />
        </NavListItem>
        <NavListItem>L</NavListItem>
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
