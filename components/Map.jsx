// external modules
import { Button } from "react-bootstrap";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// json
import arizonaPlanJson from "../data/arizona_curr.json";
import louisianaPlanJson from "../data/louisiana_curr.json";
import nevadaPlanJson from "../data/nevada_curr.json";
import randomPlanJson from "../data/az_cong_2012_to_2021.json";

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

function initRandomPlanData(state) {
  if (state === "Arizona") {
    return {
      lat: 34.048927,
      lng: -111.093735,
      zoom: 7,
      stateJson: randomPlanJson,
    };
  } else if (state === "Louisianna") {
    return {
      lat: 30.39183,
      lng: -92.329102,
      zoom: 7,
      stateJson: randomPlanJson,
    };
  } else if (state === "Nevada") {
    return {
      lat: 39.876019,
      lng: -117.224121,
      zoom: 3,
      stateJson: randomPlanJson,
    };
  }
}

function getVoivodeshipName(feature, layer) {
  if (feature.properties && feature.properties.LONGNAME) {
    if (feature.properties.CompDemVot && feature.properties.CompRepVot) {
      layer.bindPopup(
        "<p>" +
          feature.properties.LONGNAME +
          "<br /><br />Democratic : " +
          feature.properties.CompDemVot +
          "%</p>Republic : " +
          feature.properties.CompRepVot +
          "%</p>"
      );
    } else {
      layer.bindPopup(feature.properties.LONGNAME);
    }
  }
}

// function getComp(feature, layer) {
//   if (feature.properties && feature.properties.CompDemVot) {
//     layer.bindPopup(feature.properties.CompDemVot);
//   }
// }

function onEachFeature(feature, layer) {
  layer.on("mouseover", function (e) {
    console.log("mouseovered");
    getVoivodeshipName(feature, layer);

    this.openPopup();

    // style
    this.setStyle({
      fillColor: "#eb4034",
      weight: 2,
      color: "#eb4034",
      fillOpacity: 0.7,
    });
  });

  layer.on("mouseout", function () {
    this.closePopup();
    // style
    this.setStyle({
      fillColor: "#3388ff",
      weight: 2,
      color: "#3388ff",
      fillOpacity: 0.2,
    });
  });

  // layer.on('click', function (e) {
  //   console.log("clicked");
  //   getComp(feature, layer);
  //   this.openPopup();
  //   // style
  // });
}

function ChangeView({ statePlanData }) {
  const map = useMap();

  map.setView([statePlanData.lat, statePlanData.lng], statePlanData.zoom);

  return null;
}

function Map({
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  showCurrentDistrictPlan,
  isRight,
}) {
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

  const randomPlanData = initRandomPlanData(selectedState);

  if (isRight) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Button
          variant="danger"
          className="mx-5 mt-3"
          style={{ position: "absolute", top: 0, right: 0, zIndex: 99999 }}
          onClick={() => setDisplayedPlans([])}
        >
          X
        </Button>
        <MapContainer
          center={[statePlanData.lat, statePlanData.lng]}
          zoom={statePlanData.zoom}
          scrollWheelZoom={true}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></TileLayer>
          {displayedPlans.map((plan, i) => {
            return (
              <GeoJSON
                key={selectedState + plan.type + plan.id}
                data={randomPlanData.stateJson}
                onEachFeature={onEachFeature}
              />
            );
          })}
        </MapContainer>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[statePlanData.lat, statePlanData.lng]}
        zoom={statePlanData.zoom}
        scrollWheelZoom={true}
        className="map-container"
      >
        {showCurrentDistrictPlan && (
          <ChangeView statePlanData={statePlanData} />
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {showCurrentDistrictPlan && (
          <GeoJSON
            key={selectedState}
            data={statePlanData.stateJson}
            onEachFeature={onEachFeature}
          />
        )}
        {displayedPlans.map((plan, i) => {
          return (
            <GeoJSON
              key={selectedState + plan.type + plan.id}
              data={randomPlanData.stateJson}
              onEachFeature={onEachFeature}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
