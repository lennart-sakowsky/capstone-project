import { useState } from "react";
import styled from "styled-components/macro";

export default function AddTagInput({ onUpdateTags }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onUpdateTags(inputValue.toLocaleUpperCase());
      setInputValue("");
    }
  }

  return (
    <StyledInput>
      <label>Tags</label>
      &nbsp;
      <input
        type="text"
        placeholder="Tags hinzufügen"
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
      />
    </StyledInput>
  );
}

const StyledInput = styled.div`
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
`;
