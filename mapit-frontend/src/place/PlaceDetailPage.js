import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import PlaceInfo from "./PlaceInfo";
import AddTagInput from "../input/AddTagInput";
import AddedTagList from "./AddedTagList";
import useCustomRequest from "../hooks/useCustomRequest";

export default function PlaceDetailPage({ getAllPlaces, filteredPlaces }) {
  const [addedTags, setAddedTags] = useState({ tags: [] });
  const [activePlace, setActivePlace] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { isLoading, isError, deleteTag } = useCustomRequest();

  useEffect(() => {
    setActivePlace(filteredPlaces);
    // eslint-disable-next-line
  }, []);

  const onDeleteTag = (tagId, placeId) => {
    const index = activePlace[0].tags.findIndex((tag) => tag.id === tagId);
    deleteTag(baseUrl, tagId, placeId).then((response) =>
      console.log(response)
    );
    setActivePlace([
      {
        ...activePlace[0],
        tags: [
          ...activePlace[0].tags.slice(0, index),
          ...activePlace[0].tags.slice(index + 1),
        ],
      },
    ]);
  };

  function updateAddedTags(tag) {
    setAddedTags({
      tags: [...addedTags.tags, tag],
    });
  }

  return (
    <>
      {isLoading ? (
        <>
          <Message>Einen Moment bitte ...</Message>
          <Link to="/main">
            <Close onClick={getAllPlaces}>&times;</Close>
          </Link>
        </>
      ) : (
        <>
          <PlaceInfo
            onDeleteTag={onDeleteTag}
            getAllPlaces={getAllPlaces}
            activePlace={activePlace}
          />
          <AddTagInput
            onUpdateAddedTags={updateAddedTags}
            activePlace={activePlace}
          />
          <AddedTagList addedTags={addedTags.tags} />
          {isError && (
            <>
              <Message>Etwas ist schiefgegangen ...</Message>
              <Link to="/main">
                <Close onClick={getAllPlaces}>&times;</Close>
              </Link>
            </>
          )}
        </>
      )}
    </>
  );
}

const Message = styled.div`
  position: absolute;
  top: 5rem;
  left: 6rem;
  font-weight: 500;
  color: #f5f9ff;
`;

const Close = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
  color: #e8ebf0;
`;
