import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export default function PlaceInfo({ currentPlace, onDeleteTag }) {
  return (
    <FormWrapper>
      {currentPlace.map((place) => (
        <div key={place.id}>
          <Name>{place.name}</Name>
          <Address>{place.street}</Address>
          <Address>{place.zipcode}</Address>
          {place.tags.map((tag) => (
            <TagItem key={tag.id}>
              {tag.name}
              <Delete onClick={() => onDeleteTag(tag.id, place.id)}>
                &times;
              </Delete>
            </TagItem>
          ))}
          <HorizontalRule />
        </div>
      ))}
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
  margin-bottom: 1rem;
  text-align: center;
  color: #dadfe8;
`;

const HorizontalRule = styled.hr`
  margin: 2rem 0rem;
  width: 95%;
  color: #dadfe8;
`;

const TagItem = styled.li`
  display: inline-block;
  border-radius: 3px;
  margin: 0.3rem;
  padding: 0.4rem 0.3rem 0.4rem 0.8rem;
  background: #64e9f5;
  color: #1b2536;
`;

const Delete = styled.span`
  margin-left: 0.8rem;
  color: #1b2536;
`;

const Close = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  color: #dadfe8;
`;
