import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";
import GlobalStyle from "./GlobalStyle";
import reportWebVitals from "./reportWebVitals";
import { PlacesProvider } from "./context/PlacesProvider";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <PlacesProvider>
      <App />
    </PlacesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
