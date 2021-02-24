import { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import PlaceInfo from "./PlaceInfo";
import AddTagInput from "../input/AddTagInput";
import AddedTagList from "./AddedTagList";
import deleteReducer from "../reducers/deleteReducer";
import postingReducer from "../reducers/postingReducer";
import deleteTag from "../services/deleteTag";
import postTag from "../services/postTag";
import useCombinedReducer from "../hooks/useCombinedReducer";
import { postFailure, postInit, postSuccess } from "../actions/postingActions";
import {
  deleteInit,
  deleteSuccess,
  deleteFailure,
} from "../actions/deleteActions";

export default function PlaceDetailPage({ getAllPlaces, filteredPlaces }) {
  const [state, dispatch] = useCombinedReducer({
    deleteState: useReducer(deleteReducer, {
      isLoading: false,
      isError: false,
    }),
    postState: useReducer(postingReducer, {
      isPosting: false,
      isError: false,
    }),
  });

  const { deleteState, postState } = state;
  const [addedTags, setAddedTags] = useState({ tags: [] });
  const [activePlace, setActivePlace] = useState([]);

  useEffect(() => {
    setActivePlace(filteredPlaces);
    // eslint-disable-next-line
  }, []);

  const onDeleteTag = (tagId, placeId) => {
    const index = activePlace[0].tags.findIndex((tag) => tag.id === tagId);
    dispatch({ type: deleteInit });
    deleteTag(tagId, placeId).then((response) => {
      if (response.success === false) {
        dispatch({ type: deleteFailure });
      } else {
        dispatch({ type: deleteSuccess });
      }
    });
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

  function postNewTag(newTag, tagName) {
    dispatch({ type: postInit });
    postTag(newTag).then((data) => {
      if (data.success === false) {
        dispatch({ type: postFailure });
      } else {
        dispatch({ type: postSuccess });
        if (data[0].name === tagName) {
          updateAddedTags(data[0].name);
        }
      }
    });
  }

  function updateAddedTags(tag) {
    setAddedTags({
      tags: [...addedTags.tags, tag],
    });
  }

  return (
    <>
      {deleteState.isLoading || postState.isPosting ? (
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
          <AddTagInput activePlace={activePlace} postNewTag={postNewTag} />
          <AddedTagList addedTags={addedTags.tags} />
          {deleteState.isError ||
            (postState.isError && (
              <>
                <Message>Etwas ist schiefgegangen ...</Message>
                <Link to="/main">
                  <Close onClick={getAllPlaces}>&times;</Close>
                </Link>
              </>
            ))}
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
