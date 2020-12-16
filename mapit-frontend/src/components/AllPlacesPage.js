import { useEffect } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import getAllPlaces from "./../services/getAllPlaces";
import { useState } from "react";

export default function AllPlacesPage() {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    getAllPlaces().then((result) => setAllPlaces([...result]));
  }, []);

  return (
    <Wrapper>
      {allPlaces.map((place) => (
        <Place key={place.id}>
          <Name>{place.name}</Name>
          <Address>{place.street}</Address>
          <Address>{place.zipcode}</Address>
          {place.tags.map((tag) => (
            <TagListItem key={tag.id}>{tag.name}</TagListItem>
          ))}
          <HorizontalRule />
        </Place>
      ))}
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
  padding: 0.2rem 0.9rem;
`;

const Place = styled.div`
  :first-of-type {
    margin-top: 2rem;
  }
`;

const Name = styled.h2`
  display: block;
  margin-top: 0;
  color: #eff1f4;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`;

const Address = styled.h3`
  margin: 0;
  text-align: center;
  color: #eff1f4;

  :last-of-type {
    margin-bottom: 1.3rem;
  }
`;

const HorizontalRule = styled.hr`
  width: 95%;
  margin-top: 1.3rem;
  color: #dadfe8;
`;

const TagListItem = styled.div`
  display: inline-block;
  border-radius: 3px;
  margin: 0.3rem 0.3rem;
  padding: 0.4rem 0.6rem 0.4rem 0.6rem;
  background: #fe233ff7;
  color: #e8ebf0;
  box-shadow: 2px 3px 5px 2px #210835;
`;

const Close = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  color: #eff1f4;
`;
