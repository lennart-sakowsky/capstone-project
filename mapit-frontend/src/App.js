import { useEffect, useState, useContext, useReducer } from "react";
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
import loadingReducer from "./reducers/loadingReducer";
import getPlaces from "./services/getPlaces";
import {
  fetchFailure,
  fetchInit,
  fetchSuccess,
} from "./actions/loadingActions";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const userPlaces = useContext(PlacesContext);
  console.log(userPlaces);
  const setUserPlaces = useContext(PlacesDispatchContext);
  const [places, dispatchPlaces] = useReducer(loadingReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  function getAllPlaces() {
    dispatchPlaces({ type: fetchInit });
    getPlaces()
      .then((data) => {
        dispatchPlaces({
          type: fetchSuccess,
          payload: data,
        });
        setUserPlaces({ ...userPlaces, places: data });
      })
      .catch(() => dispatchPlaces({ type: fetchFailure }));
  }

  useEffect(() => {
    if (loggedIn) {
      getAllPlaces();
    }
    // eslint-disable-next-line
  }, [loggedIn]);

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
          <CustomMap />
          <Navigation />
        </Route>
        <Route path="/info">
          <PlaceDetailPage getAllPlaces={getAllPlaces} />
        </Route>
        <Route path="/places">
          <AllPlacesPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
