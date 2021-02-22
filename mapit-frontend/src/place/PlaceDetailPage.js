import PlaceInfo from "./PlaceInfo";
import { useState, useEffect, useContext, useCallback } from "react";
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
    </>
  );
}
