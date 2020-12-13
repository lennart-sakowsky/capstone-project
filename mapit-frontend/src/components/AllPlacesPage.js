import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export default function AllPlacesPage({ allPlaces }) {
  return (
    <Wrapper>
      <PlaceList>
        {allPlaces.map((place) => (
          <PlaceListItem key={place.id}>
            <Name>{place.name}</Name>
            <Address>{place.street}</Address>
            <Address>{place.zipcode}</Address>
            <HorizontalRule />
          </PlaceListItem>
        ))}
      </PlaceList>
      <Link to="/">
        <Close>&times;</Close>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.section`
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

const PlaceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PlaceListItem = styled.li`
  margin: 0.3rem;
`;

const Close = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  color: #dadfe8;
`;
