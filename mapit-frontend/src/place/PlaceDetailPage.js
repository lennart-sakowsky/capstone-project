import PlaceInfo from "./PlaceInfo";
import { useState, useContext } from "react";
import AddTagInput from "../input/AddTagInput";
import AddedTagList from "./AddedTagList";
import useCustomRequest from "../hooks/useCustomRequest";
import {
  PlacesContext,
  PlacesDispatchContext,
} from "../context/PlacesProvider";

export default function PlaceDetailPage({ getAllPlaces }) {
  const [addedTags, setAddedTags] = useState({ tags: [] });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { isLoading, isError, deleteTag } = useCustomRequest();
  const userPlaces = useContext(PlacesContext);
  const setUserPlaces = useContext(PlacesDispatchContext);

  const onDeleteTag = (tagId, placeId) => {
    const index = userPlaces.activePlace[0].tags.findIndex(
      (tag) => tag.id === tagId
    );
    deleteTag(baseUrl, tagId, placeId);
    setUserPlaces({
      ...userPlaces,
      activePlace: [
        {
          id: userPlaces.activePlace[0].id,
          name: userPlaces.activePlace[0].name,
          street: userPlaces.activePlace[0].street,
          zipcode: userPlaces.activePlace[0].zipcode,
          latitude: userPlaces.activePlace[0].latitude,
          longitude: userPlaces.activePlace[0].longitude,
          tags: [
            ...userPlaces.activePlace[0].tags.slice(0, index),
            ...userPlaces.activePlace[0].tags.slice(index + 1),
          ],
        },
      ],
    });
  };

  function updateAddedTags(tag) {
    setAddedTags({
      tags: [...addedTags.tags, tag],
    });
  }

  return (
    <>
      <PlaceInfo onDeleteTag={onDeleteTag} getAllPlaces={getAllPlaces} />
      <AddTagInput onUpdateAddedTags={updateAddedTags} />
      <AddedTagList addedTags={addedTags.tags} />
    </>
  );
}
