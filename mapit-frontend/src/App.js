import { useState } from "react";
import CustomMap from "./components/CustomMap";
import PlaceDetailPage from "./components/PlaceDetailPage";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllPlacesPage from "./components/AllPlacesPage";

function App() {
  const [currentPlace, setCurrentPlace] = useState({});
  const [taggedPlaces, setTaggedPlaces] = useState([]);

  function deleteTag(tagId, placeId) {
    console.log("clicked");
    console.log(tagId, placeId);
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CustomMap
            setCurrentPlace={setCurrentPlace}
            setTaggedPlaces={setTaggedPlaces}
            taggedPlaces={taggedPlaces}
          />
          <Navigation updateTaggedPlaces={setTaggedPlaces} />
        </Route>
        <Route path="/info">
          <PlaceDetailPage
            currentPlace={currentPlace}
            updateCurrentPlace={setCurrentPlace}
            onDeleteTag={deleteTag}
          />
        </Route>
        <Route path="/places">
          <AllPlacesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
