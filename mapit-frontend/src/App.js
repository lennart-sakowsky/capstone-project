import { useEffect, useState } from "react";
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

function App() {
  const [currentPlace, setCurrentPlace] = useState([]);
  console.log(currentPlace);
  const [taggedPlaces, setTaggedPlaces] = useState([]);
  const [userData, setUserData] = useState([]);
  console.log(userData);
  const [loggedIn, setLoggedIn] = useState(false);
  const { getPlaces } = useCustomRequest();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const getAllPlaces = async () => {
    const newPlaces = await getPlaces(baseUrl);
    setUserData(newPlaces);
  };

  useEffect(() => {
    if (loggedIn) {
      getAllPlaces();
    }
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
            <CustomMap
              setCurrentPlace={setCurrentPlace}
              setTaggedPlaces={setTaggedPlaces}
              taggedPlaces={taggedPlaces}
              userData={userData}
            />
            <Navigation updateTaggedPlaces={setTaggedPlaces} data={userData} />
          </Route>
          <Route path="/info">
            <PlaceDetailPage
              currentPlace={currentPlace}
              updateCurrentPlace={setCurrentPlace}
              getAllPlaces={getAllPlaces}
            />
          </Route>
          <Route path="/places">
            <AllPlacesPage data={userData} />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
