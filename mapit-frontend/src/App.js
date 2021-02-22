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
import DispatchContext from "./context/DispatchContext";
import useCombinedReducer from "./hooks/useCombinedReducer";

function App() {
  const [state, dispatch] = useCombinedReducer({
    filter: useReducer(filterReducer, "ALL"),
    places: useReducer(placeReducer, {
      isLoading: false,
      isError: false,
      data: [],
    }),
  });

  const { filter, places } = state;
  const [loggedIn, setLoggedIn] = useState(false);

  const handleFetchPlaces = useCallback(() => {
    if (loggedIn === false) return;

    dispatch({ type: fetchInit });
    getPlaces()
      .then((data) => {
        dispatch({
          type: fetchSuccess,
          payload: data,
        });
      })
      .catch(() => dispatch({ type: fetchFailure }));
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
    <DispatchContext.Provider value={dispatch}>
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
            <CustomMap filteredPlaces={filteredPlaces} places={places} />
            <Navigation />
          </Route>
          <Route path="/info">
            <PlaceDetailPage
              getAllPlaces={handleFetchPlaces}
              filteredPlaces={filteredPlaces}
            />
          </Route>
          <Route path="/places">
            <AllPlacesPage filteredPlaces={filteredPlaces} />
          </Route>
        </Switch>
      </Router>
    </DispatchContext.Provider>
  );
}

export default App;
