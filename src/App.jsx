// React
import { useRef, useEffect, useState } from "react";

// external modules
import mapboxgl from "mapbox-gl";

// css
import "./App.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  console.log(import.meta.env.VITE_MAPBOX_TOKEN);

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  );
}

export default App;
