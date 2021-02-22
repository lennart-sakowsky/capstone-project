import { useEffect, useState, useReducer, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import Register from "./register/Register";
import Login from "./login/Login";
import Header from "./common/Header";
import CustomMap from "./common/CustomMap";
import Navigation from "./common/Navigation";
import PlaceDetailPage from "./place/PlaceDetailPage";
import AllPlacesPage from "./allPlaces/AllPlacesPage";
import getPlaces from "./services/getPlaces";
import {
  fetchFailure,
  fetchInit,
  fetchSuccess,
} from "./actions/loadingActions";
import filterReducer from "./reducers/filterReducer";
import placeReducer from "./reducers/placeReducer";
import PlacesContext from "./context/PlacesContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const [places, dispatchPlaces] = useReducer(placeReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });
  console.log(places);

  const handleFetchPlaces = useCallback(() => {
    if (loggedIn === false) return;

    dispatchPlaces({ type: fetchInit });
    getPlaces()
      .then((data) => {
        dispatchPlaces({
          type: fetchSuccess,
          payload: data,
        });
      })
      .catch(() => dispatchPlaces({ type: fetchFailure }));
    // eslint-disable-next-line
  }, [loggedIn]);

  useEffect(() => {
    handleFetchPlaces();
  }, [handleFetchPlaces]);

  const filteredPlaces = places.data.filter((place) => {
    if (filter === "ALL") {
      return true;
    }
    if (filter === "ACTIVE" && place.active) {
      return true;
    }
    if (filter === "RELATED" && place.related) {
      return true;
    }
    return false;
  });
  console.log(filteredPlaces);

  return (
    <PlacesContext.Provider value={dispatchPlaces}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/register">
            <Register setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/login">
            <Login setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/main">
            <Header />
            <CustomMap
              filteredPlaces={filteredPlaces}
              places={places}
              dispatch={dispatchFilter}
            />
            <Navigation dispatch={dispatchFilter} />
          </Route>
          <Route path="/info">
            <PlaceDetailPage
              getAllPlaces={handleFetchPlaces}
              dispatch={dispatchFilter}
              places={filteredPlaces}
            />
          </Route>
          <Route path="/places">
            <AllPlacesPage places={filteredPlaces} dispatch={dispatchFilter} />
          </Route>
        </Switch>
      </Router>
    </PlacesContext.Provider>
  );
}

export default App;
