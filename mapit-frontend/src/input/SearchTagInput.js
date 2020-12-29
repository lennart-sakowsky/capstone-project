import { useState } from "react";
import styled from "styled-components/macro";
import useFetch from "../hooks/useFetch";

export default function SearchTagInput({ updateTaggedPlaces }) {
  const [inputValue, setInputValue] = useState("");
  const tagApi = useFetch("http://mapit-backend.local/tag");

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      tagApi
        .put({ name: inputValue.toLocaleUpperCase() })
        .then((result) => updateTaggedPlaces([...result]))
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
