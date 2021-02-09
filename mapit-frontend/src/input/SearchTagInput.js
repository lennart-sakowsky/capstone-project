import { useState } from "react";
import styled from "styled-components/macro";

export default function SearchTagInput({ updateTaggedPlaces, data }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      filterPlaces();
      setInputValue("");
    }
  }

  function filterPlaces() {
    const matchingPlaces = data.filter((place) => {
      let matchingTags = place.tags.some(
        (tags) => tags.name === inputValue.toLocaleUpperCase()
      );
      return matchingTags;
    });
    updateTaggedPlaces(matchingPlaces);
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
