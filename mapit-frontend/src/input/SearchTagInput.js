import { useState } from "react";
import styled from "styled-components/macro";
import useCustomRequest from "../hooks/useCustomRequest";

export default function SearchTagInput({ updateTaggedPlaces }) {
  const [inputValue, setInputValue] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { isLoading, isError, putTag } = useCustomRequest();

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const body = {
        name: inputValue.toLocaleUpperCase(),
      };
      putNewTag(baseUrl, body);
      setInputValue("");
    }
  }

  function putNewTag(url, body) {
    putTag(url, body)
      .then((response) => {
        updateTaggedPlaces([...response]);
      })
      .catch((error) => {
        console.log(error);
        updateTaggedPlaces(null);
      });
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
