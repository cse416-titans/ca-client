// React
import { useRef, useEffect, useState } from "react";

// external modules
import mapboxgl from "mapbox-gl";

// Components
import MapConfigurationContainer from "./MapConfigurationContainer";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div ref={mapContainer} className="map-container" />
      <MapConfigurationContainer lat={lat} lng={lng} zoom={zoom} />
    </div>
  );
}

export default Map;
