// external modules
import "leaflet/dist/leaflet.css";
import { Button } from "react-bootstrap";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";

// json
import arizonaPlanJson from "../data/arizona_curr.json";
import louisianaPlanJson from "../data/louisiana_curr.json";
import nevadaPlanJson from "../data/nevada_curr.json";

function initStatePlanData(state) {
  if (state === "AZ") {
    return {
      lat: 34.048927,
      lng: -111.093735,
      zoom: 7,
      stateJson: arizonaPlanJson,
    };
  } else if (state === "LA") {
    return {
      lat: 30.39183,
      lng: -92.329102,
      zoom: 7,
      stateJson: louisianaPlanJson,
    };
  } else if (state === "NV") {
    return {
      lat: 39.876019,
      lng: -117.224121,
      zoom: 7,
      stateJson: nevadaPlanJson,
    };
  }
}

function getVoivodeshipName(feature, layer) {
  if (feature.properties && feature.properties.SLDL_DIST) {
    layer.bindPopup(
      "<p>" +
        feature.properties.SLDL_DIST +
        "<br /><br />Democratic : " +
        feature.properties.G20PREDBID +
        "</p>Republic : " +
        feature.properties.G20PRERTRU +
        "</p>"
    );
  }
}

// function getComp(feature, layer) {
//   if (feature.properties && feature.properties.CompDemVot) {
//     layer.bindPopup(feature.properties.CompDemVot);
//   }
// }

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
  mapColorFilter,
}) {
  /*
    DESC:
    statePlanData : Enacted plan geojson
    randomPlanData : Random plan geojson
  */

  const voteStyle = (feature) => {
    const demVoteCount = feature.properties.Democratic;
    const repVoteCount = feature.properties.Republic;

    const getColor = (demVoteCount, repVoteCount) => {
      // give more red hue if repVoteCount is higher, give more blue hue if demVoteCount is higher
      const demColor = Math.round(
        255 * (demVoteCount / (demVoteCount + repVoteCount))
      );
      const repColor = Math.round(
        255 * (repVoteCount / (demVoteCount + repVoteCount))
      );
      return `rgb(${repColor}, 0, ${demColor})`;
    };

    return {
      fillColor: getColor(demVoteCount, repVoteCount),
      weight: 2,
      opacity: 1,
      color: getColor(demVoteCount, repVoteCount),
      fillOpacity: 1,
    };
  };

  const populationStyle = (feature) => {
    const whiteCount = feature.properties.White;
    const blackCount = feature.properties.Black;
    const asianCount = feature.properties.Asian;
    const AmericanIndianCount = feature.properties.American_Indian;
    const hispanicCount = feature.properties.Hispanic;

    const totalPopulation =
      whiteCount +
      blackCount +
      asianCount +
      AmericanIndianCount +
      hispanicCount;

    const getColor = (
      whiteCount,
      blackCount,
      asianCount,
      AmericanIndianCount,
      hispanicCount,
      totalPopulation,
      mode
    ) => {
      // give hue proportional to demographic proportion
      let color = null;

      const minorityCount = totalPopulation - whiteCount;

      switch (mode) {
        case "white":
          color = Math.round(255 * (whiteCount / totalPopulation));
          break;
        case "black":
          color = Math.round(255 * (blackCount / minorityCount) * 5);
          break;
        case "asian":
          color = Math.round(255 * (asianCount / minorityCount) * 5);
          break;
        case "AmericanIndian":
          color = Math.round(255 * (AmericanIndianCount / minorityCount));
          break;
        case "hispanic":
          color = Math.round(255 * (hispanicCount / minorityCount));
          break;
        case "majmin":
          color = Math.round(255 * (minorityCount / totalPopulation));
          break;
        default:
          color = Math.round(255 * (whiteCount / totalPopulation) * 5);
          break;
      }

      return `rgba(${255 - color / 2}, ${255 - color}, ${255 - color / 2})`;
    };

    return {
      fillColor: getColor(
        whiteCount,
        blackCount,
        asianCount,
        AmericanIndianCount,
        hispanicCount,
        totalPopulation,
        mapColorFilter
      ),
      weight: 2,
      opacity: 1,
      color: getColor(
        whiteCount,
        blackCount,
        asianCount,
        AmericanIndianCount,
        hispanicCount,
        totalPopulation,
        mapColorFilter
      ),
      fillOpacity: 1,
    };
  };

  const defaultStyle = (feature) => {
    const districtId = feature.properties.SLDL_DIST;

    const getColor = (districtId) => {
      const districtIdInt = parseInt(districtId);

      // make list of 30 pastel colors
      const colorArray = [
        "#FFB6C1",
        "#FFA07A",
        "#FF7F50",
        "#FF6347",
        "#FF4500",
        "#FFDAB9",
        "#FFE4B5",
        "#EEE8AA",
        "#F0E68C",
        "#BDB76B",
        "#E6E6FA",
        "#D8BFD8",
        "#DDA0DD",
        "#EE82EE",
        "#DA70D6",
        "#FF00FF",
        "#BA55D3",
        "#9370DB",
        "#8A2BE2",
        "#9400D3",
        "#9932CC",
        "#8B008B",
        "#800080",
        "#4B0082",
        "#6A5ACD",
        "#483D8B",
        "#0000FF",
        "#0000CD",
        "#00008B",
        "#000080",
      ];

      return colorArray[districtIdInt % 30];
    };

    return {
      fillColor: getColor(districtId),
      weight: 2,
      opacity: 1,
      color: getColor(districtId),
      fillOpacity: 1,
    };
  };

  function onEachFeature(feature, layer) {
    layer.on("mouseover", function (e) {
      console.log("mouseovered");
      getVoivodeshipName(feature, layer);

      this.openPopup();

      // style
      this.setStyle({
        fillOpacity: 0.5,
      });
    });

    layer.on("mouseout", function () {
      this.closePopup();
      // style
      this.setStyle({
        fillOpacity: 1,
      });
    });
  }

  let statePlanData = null;

  switch (selectedState) {
    case "AZ":
      statePlanData = initStatePlanData("AZ");
      break;
    case "LA":
      statePlanData = initStatePlanData("LA");
      break;
    case "NV":
      statePlanData = initStatePlanData("NV");
      break;
    default:
      break;
  }

  if (!statePlanData) {
    return <div></div>;
  }

  /*
    TODO: randomPlanData -> list of real plan data in displayedPlans
  */
  /*const randomPlanData = initRandomPlanData(selectedState);*/
  /*const randomPlanData = [...displayedPlans];*/

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
                data={plan.geometry}
                onEachFeature={onEachFeature}
                style={defaultStyle}
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
            style={
              mapColorFilter === "vote"
                ? voteStyle
                : mapColorFilter === "default"
                ? defaultStyle
                : populationStyle
            }
          />
        )}
        {displayedPlans.map((plan, i) => {
          return (
            <GeoJSON
              key={selectedState + plan.type + plan.id}
              data={plan.geometry}
              onEachFeature={onEachFeature}
              style={
                mapColorFilter === "vote"
                  ? voteStyle
                  : mapColorFilter === "default"
                  ? defaultStyle
                  : populationStyle
              }
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
