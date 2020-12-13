import { useState } from "react";
import styled from "styled-components/macro";

export default function SearchTagInput({ onUpdateSearchedTag }) {
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

  function onUpdateTags(inputValue) {
    const tag = {
      name: inputValue,
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(tag);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch("http://mapit-backend.local/tag", requestOptions)
      .then((response) => response.json())
      .then(
        (result) =>
          console.log(
            result
          ) /* {
        // -------- Spread all places into state --------
        // --------- onUpdateSearchedTag() --------
      } */
      );
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
