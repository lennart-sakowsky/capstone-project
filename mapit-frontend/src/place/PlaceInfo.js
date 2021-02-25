import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PlaceInfo({ onDeleteTag, getAllPlaces, activePlace }) {
  return (
    <FormWrapper>
      {activePlace.map((place) => (
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
      <Link to="/main">
        <Close onClick={getAllPlaces}>&times;</Close>
      </Link>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  position: relative;
  max-width: 380px;
  margin: 0 auto;
  padding: 0.2rem 0.5rem;
`;

const Name = styled.h2`
  display: block;
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: #f5f9ff;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
`;

const Address = styled.h3`
  margin: 0;
  margin-bottom: 2rem;
  text-align: center;
  color: #f5f9ff;

  :first-of-type {
    margin-bottom: 0;
  }
`;

const HorizontalRule = styled.hr`
  margin-top: 1.3rem;
  margin-bottom: 2.3rem;
  width: 95%;
  color: #f5f9ff;
`;

const TagItem = styled.li`
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

const Delete = styled.span`
  margin-left: 0.8rem;
  color: #f5f9ff;
`;

const Close = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  color: #e8ebf0;
`;

PlaceInfo.propTypes = {
  onDeleteTag: PropTypes.func,
  getAllPlaces: PropTypes.func,
  activePlace: PropTypes.array,
};
