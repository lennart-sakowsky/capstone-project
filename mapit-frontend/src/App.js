import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./landing/LandingPage";
import Register from "./register/Register";
import Login from "./login/Login";
import Header from "./common/Header";
import CustomMap from "./common/CustomMap";
import Navigation from "./common/Navigation";
import PlaceDetailPage from "./place/PlaceDetailPage";
import AllPlacesPage from "./allPlaces/AllPlacesPage";
import { loadFromLocal, saveToLocal } from "./lib/localStorage";
import useCustomRequest from "./hooks/useCustomRequest";
import UserContext from "./context/UserContext";
import { PlacesContext, PlacesDispatchContext } from "./context/PlacesProvider";

function App() {
  const [userData, setUserData] = useState([]);
  console.log(userData);
  const [loggedIn, setLoggedIn] = useState(false);
  const { getPlaces } = useCustomRequest();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const userPlaces = useContext(PlacesContext);
  console.log(userPlaces);
  const setUserPlaces = useContext(PlacesDispatchContext);

  const getAllPlaces = async () => {
    const newPlaces = await getPlaces(baseUrl);
    setUserPlaces({ ...userPlaces, places: newPlaces });
  };

  useEffect(() => {
    if (loggedIn) {
      getAllPlaces();
    }
    // eslint-disable-next-line
  }, [loggedIn]);

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
    <UserContext.Provider value={userData}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/register">
            <Register setToken={setValue} />
          </Route>
          <Route exact path="/login">
            <Login
              setToken={setValue}
              setData={setUserData}
              setLoggedIn={setLoggedIn}
            />
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
    </UserContext.Provider>
  );
}

export default App;
