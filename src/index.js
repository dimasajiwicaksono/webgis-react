import React from "react";
import ReactDOM from "react-dom";

import "./Map.css";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";

import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

import Map from "./Map";

const rootElement = document.getElementById("root");
ReactDOM.render(<Map />, rootElement);
