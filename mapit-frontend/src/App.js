import { useState } from "react";
import CustomMap from "./components/CustomMap";
import PlaceDetailPage from "./components/PlaceDetailPage";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllPlacesPage from "./components/AllPlacesPage";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  const [currentPlace, setCurrentPlace] = useState({});
  const [taggedPlaces, setTaggedPlaces] = useState([]);

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
