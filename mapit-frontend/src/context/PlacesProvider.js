import { createContext, useState } from "react";

const PlacesContext = createContext(undefined);
const PlacesDispatchContext = createContext(undefined);

function PlacesProvider({ children }) {
  const [userPlaces, setUserPlaces] = useState({
    places: [],
    activePlace: [],
    taggedPlaces: [],
  });

  return (
    <PlacesContext.Provider value={userPlaces}>
      <PlacesDispatchContext.Provider value={setUserPlaces}>
        {children}
      </PlacesDispatchContext.Provider>
    </PlacesContext.Provider>
  );
}

export { PlacesProvider, PlacesContext, PlacesDispatchContext };
