// external modules
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// json
import arizonaPlanJson from "../data/arizona_curr.json";
import louisianaPlanJson from "../data/louisiana_curr.json";
import nevadaPlanJson from "../data/nevada_curr.json";

function initStatePlanData(state) {
  if (state === "Arizona") {
    return {
      lat: 34.048927,
      lng: -111.093735,
      zoom: 7,
      stateJson: arizonaPlanJson,
    };
  } else if (state === "Louisianna") {
    return {
      lat: 30.39183,
      lng: -92.329102,
      zoom: 7,
      stateJson: louisianaPlanJson,
    };
  } else if (state === "Nevada") {
    return {
      lat: 39.876019,
      lng: -117.224121,
      zoom: 7,
      stateJson: nevadaPlanJson,
    };
  }
}

function ChangeView({ statePlanData }) {
  const map = useMap();

  map.setView([statePlanData.lat, statePlanData.lng], statePlanData.zoom);

  return null;
}

function Map({ selectedState }) {
  let statePlanData = null;

  switch (selectedState) {
    case "Arizona":
      statePlanData = initStatePlanData("Arizona");
      break;
    case "Louisianna":
      statePlanData = initStatePlanData("Louisianna");
      break;
    case "Nevada":
      statePlanData = initStatePlanData("Nevada");
      break;
    default:
      break;
  }

  if (!statePlanData) {
    return <div></div>;
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[statePlanData.lat, statePlanData.lng]}
        zoom={statePlanData.zoom}
        scrollWheelZoom={true}
        className="map-container"
      >
        <ChangeView statePlanData={statePlanData} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        <GeoJSON key={selectedState} data={statePlanData.stateJson} />
      </MapContainer>
    </div>
  );
}

export default Map;
