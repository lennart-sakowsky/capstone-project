import { useState } from "react";
import styled from "styled-components/macro";
import getTaggedPlaces from "./../services/getTaggedPlaces";

export default function SearchTagInput({ onUpdateTaggedPlaces }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      getTaggedPlaces({ name: inputValue.toLocaleUpperCase() })
        .then((result) => onUpdateTaggedPlaces([...result]))
        .catch((error) => console.log(error));
      setInputValue("");
    }
  }

  return (
    <StyledInput>
      <input
        type="text"
        placeholder="Nach Tags filtern"
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
      />
    </StyledInput>
  );
}

const StyledInput = styled.div`
  transform: scale(1.4);

  input {
    border-radius: 10px;
    padding: 2px 8px;
  }
`;
