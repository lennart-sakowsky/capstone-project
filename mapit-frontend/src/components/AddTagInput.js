import { useState } from "react";
import styled from "styled-components/macro";

export default function AddTagInput({ currentPlace, onUpdateAddedTags }) {
  const [inputValue, setInputValue] = useState("");

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
        name: currentPlace.name,
        street: currentPlace.street,
        zipcode: currentPlace.zipcode,
        latitude: currentPlace.latitude,
        longitude: currentPlace.longitude,
      },
    };

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(newTag);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch("http://mapit-backend.local/tag", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        /* onUpdateAddedTags({ result }); */
        onUpdateAddedTags(inputValue);
      });
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
  transform: scale(1.4);
  left: 28%;
  bottom: 30px;

  input {
    border-radius: 10px;
    padding: 2px 8px;
  }
`;
