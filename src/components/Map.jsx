// React
import { useRef, useEffect, useState } from "react";

// external modules
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[34.048927, -111.093735]}
        zoom={7}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
      </MapContainer>
    </div>
  );
}

export default Map;
