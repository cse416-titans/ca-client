// React
import { useRef, useEffect, useState } from "react";

// external modules
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

function ChangeView({ map_f }) {
  const map = useMap();
  map.setView(map_f[0], map_f[1]);
  return null;
}

function Map({ map_f }) {
  const data = () => {
    return <GeoJSON key={map_f[2].name} data={map_f[2]}/>
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={map_f[0]}
        zoom={map_f[1]}
        scrollWheelZoom={true}
        className="map-container"
      >
        <ChangeView map_f={map_f}/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {data()}
      </MapContainer>
    </div>
  );
}

export default Map;
