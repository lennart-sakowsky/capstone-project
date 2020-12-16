import PlaceInfo from "./PlaceInfo";
import { useState } from "react";
import AddTagInput from "./AddTagInput";
import AddedTagList from "./AddedTagList";

export default function PlaceDetailPage({
  currentPlace,
  updateCurrentPlace,
  onDeleteTag,
}) {
  const [addedTags, setAddedTags] = useState({ tags: [] });

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
      />
      <AddTagInput
        currentPlace={currentPlace}
        onUpdateAddedTags={updateAddedTags}
      />
      <AddedTagList addedTags={addedTags.tags} />
    </>
  );
}
