import { useState } from "react";
import CustomMap from "./components/CustomMap";
import PlaceDetailPage from "./components/PlaceDetailPage";
import Navigation from "./components/navigation/Navigation";
import deleteTagService from "./services/deleteTagService";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllPlacesPage from "./components/AllPlacesPage";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  const [currentPlace, setCurrentPlace] = useState({});
  const [taggedPlaces, setTaggedPlaces] = useState([]);

  function deleteTag(tagId, placeId) {
    const index = currentPlace[0].tags.findIndex((tag) => tag.id === tagId);
    deleteTagService(tagId, placeId);
    setCurrentPlace([
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
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/main">
          <Header />
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
