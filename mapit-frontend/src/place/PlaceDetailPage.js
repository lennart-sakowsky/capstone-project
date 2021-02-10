import PlaceInfo from "./PlaceInfo";
import { useState } from "react";
import AddTagInput from "../input/AddTagInput";
import AddedTagList from "./AddedTagList";
import useCustomRequest from "../hooks/useCustomRequest";

export default function PlaceDetailPage({
  currentPlace,
  updateCurrentPlace,
  getAllPlaces,
}) {
  const [addedTags, setAddedTags] = useState({ tags: [] });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { isLoading, isError, deleteTag } = useCustomRequest();

  const onDeleteTag = (tagId, placeId) => {
    const index = currentPlace[0].tags.findIndex((tag) => tag.id === tagId);
    deleteTag(baseUrl, tagId, placeId);
    updateCurrentPlace([
      {
        id: currentPlace[0].id,
        name: currentPlace[0].name,
        street: currentPlace[0].street,
        zipcode: currentPlace[0].zipcode,
        latitude: currentPlace[0].latitude,
        longitude: currentPlace[0].longitude,
        tags: [
          ...currentPlace[0].tags.slice(0, index),
          ...currentPlace[0].tags.slice(index + 1),
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
        currentPlace={currentPlace}
        updateCurrentPlace={updateCurrentPlace}
        onDeleteTag={onDeleteTag}
        getAllPlaces={getAllPlaces}
      />
      <AddTagInput
        currentPlace={currentPlace}
        onUpdateAddedTags={updateAddedTags}
      />
      <AddedTagList addedTags={addedTags.tags} />
    </>
  );
}
