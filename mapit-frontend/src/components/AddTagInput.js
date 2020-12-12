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
  transform: scale(1.4);
  left: 28%;
  bottom: 30px;

  input {
    border-radius: 10px;
    padding: 2px 8px;
  }
`;
