import PlaceInfo from "./PlaceInfo";
import { useState } from "react";
import AddTagInput from "../input/AddTagInput";
import AddedTagList from "./AddedTagList";
import useFetch from "../hooks/useFetch";

export default function PlaceDetailPage({ currentPlace, updateCurrentPlace }) {
  const [addedTags, setAddedTags] = useState({ tags: [] });
  const tagApi = useFetch("http://mapit-backend.local/tag");

  const deleteTag = (tagId, placeId) => {
    const index = currentPlace[0].tags.findIndex((tag) => tag.id === tagId);
    tagApi.del(tagId, placeId).then((result) => {
      return result;
    });
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
        onDeleteTag={deleteTag}
      />
      <AddTagInput
        currentPlace={currentPlace}
        onUpdateAddedTags={updateAddedTags}
      />
      <AddedTagList addedTags={addedTags.tags} />
    </>
  );
}
