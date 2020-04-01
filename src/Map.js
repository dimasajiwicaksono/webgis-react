import React, { Component } from "react";
import { 
  Map, 
  TileLayer,
  Popup, 
  Circle,
  FeatureGroup,
  LayersControl,
  } from "react-leaflet";
import * as L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import "./Map.css";

// import marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:"https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

class MapComp extends Component {
  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);
    const scale = new L.control.scale().addTo(map);

    searchControl.on("results", function(data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });
  }

  render() {
    const center = [-2.53, 117.33];
    const { BaseLayer, Overlay } = LayersControl

    return (
        <Map
        style={{ height: "100vh" }}
        center={center}
        zoom="5"
        ref={m => {
          this.leafletMap = m;
        }}
        >
        <LayersControl position="topright">
          <BaseLayer checked name="OSM Mapnik">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="OSM Black and White">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <Overlay name="Circle Point">
            <FeatureGroup color="purple">
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[-2.53, 117.33]} radius={1000} />
            </FeatureGroup>
          </Overlay>
        </LayersControl>
      </Map>
    );
  }
}

export default MapComp;