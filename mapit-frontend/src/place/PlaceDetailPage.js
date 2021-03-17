import { useState, useEffect, useReducer, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Loader from "react-loader-spinner";
import DispatchContext from "../context/DispatchContext";
import PlaceInfo from "./PlaceInfo";
import AddTagInput from "../input/AddTagInput";
import AddedTagList from "./AddedTagList";
import deleteReducer from "../reducers/deleteReducer";
import postingReducer from "../reducers/postingReducer";
import deleteTag from "../services/deleteTag";
import postTag from "../services/postTag";
import getPlaces from "../services/getPlaces";
import useCombinedReducer from "../hooks/useCombinedReducer";
import { postFailure, postInit, postSuccess } from "../actions/postingActions";
import {
  deleteInit,
  deleteSuccess,
  deleteFailure,
} from "../actions/deleteActions";
import PropTypes from "prop-types";

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
  const dispatchPlaces = useContext(DispatchContext);

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
      {deleteState.isError ||
        (postState.isError && (
          <>
            <Message>Etwas ist schiefgegangen ...</Message>
            <Link to="/main">
              <Close onClick={() => getAllPlaces(dispatchPlaces, getPlaces)}>
                &times;
              </Close>
            </Link>
          </>
        ))}
      {deleteState.isLoading || postState.isPosting ? (
        <>
          <LoaderWrapper>
            <Loader type="TailSpin" color="#f5f9ff" height={80} width={80} />
          </LoaderWrapper>
          <Link to="/main">
            <Close onClick={() => getAllPlaces(dispatchPlaces, getPlaces)}>
              &times;
            </Close>
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

const LoaderWrapper = styled.div`
  padding-top: 16rem;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

PlaceDetailPage.propTypes = {
  getAllPlaces: PropTypes.func,
  filteredPlaces: PropTypes.array,
};
