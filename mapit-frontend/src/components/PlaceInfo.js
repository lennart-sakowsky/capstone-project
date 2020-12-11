import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export default function PlaceInfo({ currentPlace }) {
  return (
    <FormWrapper>
      <Name>{currentPlace.name}</Name>
      <Address>{currentPlace.street}</Address>
      <Address>{currentPlace.zipcode}</Address>
      <BlackHorizontalRule />
      <TagList>
        {currentPlace.tags.map((tag) => (
          <TagListItem key={tag.id}>{tag.name}</TagListItem>
        ))}
      </TagList>
      <Link to="/">
        <Close>x</Close>
      </Link>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  position: relative;
  display: grid;
  gap: 0.9rem;
  max-width: 380px;
  font-family: sans-serif;
  margin: 0 auto;
`;

const Name = styled.h2`
  display: block;
  font-size: 2em;
  margin-top: 3rem;
  font-weight: bold;
  text-align: center;
`;

const Address = styled.h3`
  margin: 0;
  text-align: center;
`;

const BlackHorizontalRule = styled.hr`
  margin-top: 4rem;
  width: 90%;
  border-top: 6px dotted black;
`;

const TagList = styled.ul`
  list-style: none;
`;

const TagListItem = styled.li`
  display: inline-block;
  border-radius: 3px;
  margin: 0.7rem;
  padding: 0.5rem 1.5rem;
  background: #64e9f5;
  color: black;
`;

const Close = styled.div`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
`;
