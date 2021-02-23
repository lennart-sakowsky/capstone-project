import { useState, useContext } from "react";
import styled from "styled-components/macro";
import { showRelated } from "../actions/filterActions";
import { setRelated } from "../actions/placeActions";
import DispatchContext from "../context/DispatchContext";

export default function SearchTagInput() {
  const dispatch = useContext(DispatchContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleShowRelated = () => {
    dispatch({ type: showRelated });
  };

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      dispatch({ type: setRelated, payload: searchTerm });
      handleShowRelated();
      event.preventDefault();
      setSearchTerm("");
    }
  }

  return (
    <StyledInput>
      <input
        type="text"
        placeholder="Nach Tags filtern"
        onChange={handleChange}
        value={searchTerm}
        onKeyDown={handleKeyDown}
      />
    </StyledInput>
  );
}

const StyledInput = styled.div`
  bottom: 22px;
  position: fixed;
  left: 30.9%;
  transform: scale(1.4);

  input {
    border: 1px solid var(--blue-50);
    border-radius: 8px;
    padding: 2px 8px;
    font-weight: 100;
    font-size: 70%;
  }
`;
