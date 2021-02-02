import { useState } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";
import useCustomRequest from "../services/useCustomRequest";

AddTagInput.propTypes = {
  handleChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  onUpdateTags: PropTypes.func,
};

export default function AddTagInput({ currentPlace, onUpdateAddedTags }) {
  const [inputValue, setInputValue] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { isLoading, isError, postTag } = useCustomRequest();

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onUpdateTags(inputValue.toLocaleUpperCase(), currentPlace);
      setInputValue("");
    }
  }

  function onUpdateTags(inputValue, currentPlace) {
    const newTag = {
      name: inputValue,
      taggedPlace: {
        name: currentPlace[0].name,
        street: currentPlace[0].street,
        zipcode: currentPlace[0].zipcode,
        latitude: currentPlace[0].latitude,
        longitude: currentPlace[0].longitude,
      },
    };
    postNewTag(baseUrl, newTag, inputValue);
  }

  async function postNewTag(url, body, tagName) {
    const response = await postTag(url, body);
    if (response[0].name === tagName) {
      onUpdateAddedTags(response[0].name);
    }
  }

  return (
    <StyledInput>
      <input
        type="text"
        placeholder="Tag hinzufügen"
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
      />
    </StyledInput>
  );
}

const StyledInput = styled.div`
  position: fixed;
  left: 31%;
  bottom: 30px;

  input {
    transform: scale(1.4);
    border: 1px solid var(--blue-50);
    border-radius: 8px;
    padding: 2px 8px;
    font-weight: 100;
    font-size: 70%;
  }
`;
