import {
  useEffect,
  useState,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import Register from "./register/Register";
import Login from "./login/Login";
import Header from "./common/Header";
import CustomMap from "./common/CustomMap";
import Navigation from "./common/Navigation";
import PlaceDetailPage from "./place/PlaceDetailPage";
import AllPlacesPage from "./allPlaces/AllPlacesPage";
import { PlacesContext, PlacesDispatchContext } from "./context/PlacesProvider";
import getPlaces from "./services/getPlaces";
import {
  fetchFailure,
  fetchInit,
  fetchSuccess,
} from "./actions/loadingActions";
import filterReducer from "./reducers/filterReducer";
import placeReducer from "./reducers/placeReducer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  const [testPlaces, dispatchTestPlaces] = useReducer(placeReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });
  console.log(testPlaces);

  const handleFetchPlaces = useCallback(() => {
    if (loggedIn === false) return;

    dispatchTestPlaces({ type: fetchInit });
    getPlaces()
      .then((data) => {
        dispatchTestPlaces({
          type: fetchSuccess,
          payload: data,
        });
      })
      .catch(() => dispatchTestPlaces({ type: fetchFailure }));
    // eslint-disable-next-line
  }, [loggedIn]);

  useEffect(() => {
    handleFetchPlaces();
  }, [handleFetchPlaces]);

  const filteredPlaces = testPlaces.data.filter((place) => {
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
            places={filteredPlaces}
            dispatchTest={dispatchTestPlaces}
            testPlaces={testPlaces}
            dispatch={dispatchFilter}
          />
          <Navigation
            dispatch={dispatchFilter}
            dispatchTest={dispatchTestPlaces}
          />
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
  );
}

export default App;
