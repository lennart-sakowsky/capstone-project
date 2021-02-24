import { useContext, useEffect } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { showAll } from "../actions/filterActions";
import { setUnrelated } from "../actions/placeActions";
import DispatchContext from "../context/DispatchContext";

export default function AllPlacesPage({ filteredPlaces, places }) {
  const dispatch = useContext(DispatchContext);

  const handleShowAll = () => {
    dispatch({ type: showAll });
  };

  const handleSetInactive = () => {
    dispatch({ type: setUnrelated });
  };

  useEffect(() => {
    handleShowAll();
    handleSetInactive();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {places.isLoading ? (
        <>
          <Message>Einen Moment bitte ...</Message>
          <Link to="/main">
            <Close>&times;</Close>
          </Link>
        </>
      ) : (
        <>
          <Wrapper>
            {filteredPlaces.map((place) => (
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
            <Link to="/main">
              <Close>&times;</Close>
            </Link>
          </Wrapper>
          {places.isError && (
            <>
              <Message>Etwas ist schiefgegangen ...</Message>
              <Link to="/main">
                <Close>&times;</Close>
              </Link>
            </>
          )}
        </>
      )}
    </>
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

const Message = styled.div`
  position: absolute;
  top: 5rem;
  left: 6rem;
  font-weight: 500;
  color: #f5f9ff;
`;

const Place = styled.div`
  :first-of-type {
    margin-top: 2rem;
  }
`;

const Name = styled.h2`
  display: block;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #f5f9ff;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`;

const Address = styled.h3`
  margin: 0;
  text-align: center;
  color: #f5f9ff;

  :last-of-type {
    margin-bottom: 1.3rem;
  }
`;

const HorizontalRule = styled.hr`
  width: 95%;
  margin-top: 1.3rem;
  color: #f5f9ff;
`;

const TagListItem = styled.div`
  display: inline-block;
  border-radius: 5px;
  margin: 0.5rem 0.7rem 0.5rem;
  padding: 0.4rem 0.6rem 0.4rem 0.6rem;
  font-weight: 600;
  font-size: 95%;
  letter-spacing: 1px;
  background: #fe233ff7;
  color: #e8ebf0;
  box-shadow: 1px 2px 3px 1px #210835;
`;

const Close = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  color: #f5f9ff;
`;
