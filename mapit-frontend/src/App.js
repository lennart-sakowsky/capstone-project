import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import Login from "./login/Login";
import Header from "./common/Header";
import CustomMap from "./common/CustomMap";
import Navigation from "./common/Navigation";
import PlaceDetailPage from "./place/PlaceDetailPage";
import AllPlacesPage from "./allPlaces/AllPlacesPage";
import { loadFromLocal, saveToLocal } from "./lib/localStorage";

function App() {
  const [currentPlace, setCurrentPlace] = useState({});
  const [taggedPlaces, setTaggedPlaces] = useState([]);

  const useStateWithLocalStorage = (localStorageKey) => {
    const [value, setValue] = useState(loadFromLocal(localStorageKey) || "");

    useEffect(() => {
      saveToLocal(localStorageKey, value);
      // eslint-disable-next-line
    }, [value]);
    return [value, setValue];
  };

  const [value, setValue] = useStateWithLocalStorage("token");

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/login">
          <Login setToken={setValue} />
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
