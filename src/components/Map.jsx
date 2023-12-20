// external modules
import "leaflet/dist/leaflet.css";
import { Button } from "react-bootstrap";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";

// json
import arizonaPlanJson from "../data/arizona_curr.json";
import louisianaPlanJson from "../data/louisiana_curr.json";
import nevadaPlanJson from "../data/nevada_curr.json";

import { useState } from "react";

function initStatePlanData(state) {
  if (state === "AZ") {
    return {
      lat: 34.048927,
      lng: -111.093735,
      zoom: 6,
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
      zoom: 6,
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
  currentlyEnactedPlan,
  showInitial,
  AZSummary,
  LASummary,
  NVSummary,
}) {
  /*
    DESC:
    statePlanData : Enacted plan geojson
    randomPlanData : Random plan geojson
  */

  if (!AZSummary || !LASummary || !NVSummary) {
    return <div></div>;
  }

  console.log("showInitial", showInitial);

  const voteStyle = (feature) => {
    const demVoteCount = feature.properties.Democratic;
    const repVoteCount = feature.properties.Republic;

    const getColor = (demVoteCount, repVoteCount) => {
      // give red if republican won, blue if democrat won
      if (demVoteCount > repVoteCount) {
        return "#0000ff";
      } else if (demVoteCount < repVoteCount) {
        return "#ff0000";
      } else {
        return "#ffffff";
      }
    };

    return {
      fillColor: getColor(demVoteCount, repVoteCount),
      weight: 1,
      opacity: 0.5,
      color: "black",
      fillOpacity: 0.5,
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

      // for each mode, if the population is greater than half of the total population, give purple color; else if greather than 25%, give light purple; else if greater than 10%, give more light purple; else give white
      switch (mode) {
        case "white":
          if (whiteCount / totalPopulation > 0.5) {
            color = "#800080";
          } else if (whiteCount / totalPopulation > 0.25) {
            color = "#9370DB";
          } else if (whiteCount / totalPopulation > 0.1) {
            color = "#D8BFD8";
          } else {
            color = "#FFFFFF";
          }
          break;
        case "black":
          if (blackCount / totalPopulation > 0.5) {
            color = "#800080";
          } else if (blackCount / totalPopulation > 0.25) {
            color = "#9370DB";
          } else if (blackCount / totalPopulation > 0.1) {
            color = "#D8BFD8";
          } else {
            color = "#FFFFFF";
          }
          break;
        case "asian":
          if (asianCount / totalPopulation > 0.5) {
            color = "#800080";
          } else if (asianCount / totalPopulation > 0.25) {
            color = "#9370DB";
          } else if (asianCount / totalPopulation > 0.1) {
            color = "#D8BFD8";
          } else {
            color = "#FFFFFF";
          }
          break;
        case "AmericanIndian":
          if (AmericanIndianCount / totalPopulation > 0.5) {
            color = "#800080";
          } else if (AmericanIndianCount / totalPopulation > 0.25) {
            color = "#9370DB";
          } else if (AmericanIndianCount / totalPopulation > 0.1) {
            color = "#D8BFD8";
          } else {
            color = "#FFFFFF";
          }
          break;
        case "hispanic":
          if (hispanicCount / totalPopulation > 0.5) {
            color = "#800080";
          } else if (hispanicCount / totalPopulation > 0.25) {
            color = "#9370DB";
          } else if (hispanicCount / totalPopulation > 0.1) {
            color = "#D8BFD8";
          } else {
            color = "#FFFFFF";
          }
          break;
        case "majmin":
          if (minorityCount / totalPopulation > 0.5) {
            color = "#800080";
          } else if (minorityCount / totalPopulation > 0.25) {
            color = "#9370DB";
          } else if (minorityCount / totalPopulation > 0.1) {
            color = "#D8BFD8";
          } else {
            color = "#FFFFFF";
          }
          break;
        default:
          break;
      }

      return color;
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
      weight: 1,
      opacity: 0.5,
      color: "black",
      fillOpacity: 0.5,
    };
  };

  const initialStyle = (feature) => {
    return {
      fillColor: "pink",
      weight: 1,
      opacity: 0.5,
      color: "black",
      fillOpacity: 0.5,
    };
  };

  const borderHighlightStyle = (feature) => {
    return {
      fillColor: "white",
      weight: 2,
      opacity: 1,
      color: "red",
      fillOpacity: 0,
    };
  };

  const borderHighlightStyle2 = (feature) => {
    return {
      fillColor: "white",
      weight: 2,
      opacity: 1,
      color: "green",
      fillOpacity: 0,
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
      weight: 1,
      opacity: 0.5,
      color: "black",
      fillOpacity: 0.5,
    };
  };

  function onEachFeature(feature, layer) {
    layer.on("mouseover", function (e) {
      console.log("mouseovered");
      //getVoivodeshipName(feature, layer);

      //this.openPopup();

      // style
    });

    layer.on("mouseout", function () {
      //this.closePopup();
      // style
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
    statePlanData = {
      lat: 34.048927,
      lng: -104.093735,
      zoom: 4.5,
    };
  }

  /*
    TODO: randomPlanData -> list of real plan data in displayedPlans
  */
  /*const randomPlanData = initRandomPlanData(selectedState);*/
  /*const randomPlanData = [...displayedPlans];*/

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {isRight && (
        <Button
          variant="danger"
          className="mx-5 mt-3"
          style={{ position: "absolute", top: 0, right: 0, zIndex: 99999 }}
          onClick={() => setDisplayedPlans([])}
        >
          X
        </Button>
      )}
      <MapContainer
        center={[statePlanData.lat, statePlanData.lng]}
        zoom={statePlanData.zoom}
        scrollWheelZoom={true}
        className="map-container"
      >
        {showInitial && (
          <ChangeView
            statePlanData={{
              lat: 34.048927,
              lng: -104.093735,
              zoom: 4.5,
            }}
          />
        )}
        {!showInitial && <ChangeView statePlanData={statePlanData} />}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {showInitial &&
          !isRight &&
          [AZSummary, LASummary, NVSummary].map((summary) => {
            return (
              <GeoJSON
                key={summary.state}
                data={summary.geoJson}
                onEachFeature={onEachFeature}
                style={initialStyle}
              />
            );
          })}
        {!showInitial &&
          showCurrentDistrictPlan &&
          currentlyEnactedPlan &&
          !isRight && (
            <GeoJSON
              key={selectedState}
              data={currentlyEnactedPlan["geoJson"]}
              onEachFeature={onEachFeature}
              style={
                mapColorFilter === "vote"
                  ? voteStyle
                  : mapColorFilter === "default"
                  ? defaultStyle
                  : mapColorFilter === "highlight"
                  ? borderHighlightStyle2
                  : populationStyle
              }
            />
          )}
        {!showInitial &&
          displayedPlans.map((plan, i) => {
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
                    : mapColorFilter === "highlight"
                    ? borderHighlightStyle
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
