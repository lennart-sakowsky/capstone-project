import PlaceInfo from "./PlaceInfo";
import AddTagInput from "./AddTagInput";

export default function PlaceDetailPage({ currentPlace }) {
  return (
    <>
      <PlaceInfo currentPlace={currentPlace} />
      <AddTagInput />
    </>
  );
}
