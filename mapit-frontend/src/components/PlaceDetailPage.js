import PlaceInfo from "./PlaceInfo";
import { useState } from "react";
import AddTagInput from "./AddTagInput";
import AddedTagList from "./AddedTagList";

export default function PlaceDetailPage({ currentPlace }) {
  const [addedTags, setAddedTags] = useState({ tags: [] });

  function updateAddedTags(tag) {
    setAddedTags({
      tags: [...addedTags.tags, tag],
    });
  }

  return (
    <>
      <PlaceInfo currentPlace={currentPlace} />
      <AddTagInput
        currentPlace={currentPlace}
        onUpdateAddedTags={updateAddedTags}
      />
      <AddedTagList addedTags={addedTags.tags} />
    </>
  );
}
