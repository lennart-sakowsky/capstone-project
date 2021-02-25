import { useState } from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

export default function AddTagInput({ activePlace, postNewTag }) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onUpdateTags(inputValue.toLocaleUpperCase(), activePlace);
      setInputValue("");
    }
  }

  function onUpdateTags(inputValue, activePlace) {
    const newTag = {
      name: inputValue,
      taggedPlace: {
        name: activePlace[0].name,
        street: activePlace[0].street,
        zipcode: activePlace[0].zipcode,
        latitude: activePlace[0].latitude,
        longitude: activePlace[0].longitude,
        active: false,
        related: false,
      },
    };
    postNewTag(newTag, inputValue);
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

AddTagInput.propTypes = {
  activePlace: PropTypes.array,
  postNewTag: PropTypes.func,
};
