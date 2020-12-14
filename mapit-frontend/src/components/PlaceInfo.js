import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export default function PlaceInfo({ currentPlace }) {
  return (
    <FormWrapper>
      <Name>{currentPlace.name}</Name>
      <Address>{currentPlace.street}</Address>
      <Address>{currentPlace.zipcode}</Address>
      <TagList>
        {currentPlace.tags.map((tag) => (
          <TagListItem key={tag.id}>
            {tag.name}
            <Delete>&times;</Delete>
          </TagListItem>
        ))}
      </TagList>
      <HorizontalRule />
      <Link to="/">
        <Close>&times;</Close>
      </Link>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  position: relative;
  display: grid;
  gap: 0.9rem;
  max-width: 380px;
  margin: 0 auto;
  padding: 0.2rem 0.5rem;
`;

const Name = styled.h2`
  display: block;
  color: #dadfe8;
  font-size: 2em;
  margin-top: 3rem;
  font-weight: bold;
  text-align: center;
`;

const Address = styled.h3`
  margin: 0;
  text-align: center;
  color: #dadfe8;
`;

const HorizontalRule = styled.hr`
  width: 95%;
  color: #dadfe8;
`;

const TagList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TagListItem = styled.li`
  display: inline-block;
  border-radius: 3px;
  margin: 0.3rem;
  padding: 0.4rem 0.3rem 0.4rem 0.8rem;
  background: #64e9f5;
  color: #1b2536;
`;

const Close = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  color: #dadfe8;
`;

const Delete = styled.span`
  margin-left: 0.8rem;
  color: #1b2536;
`;
