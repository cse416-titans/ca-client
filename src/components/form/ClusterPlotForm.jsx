import { useEffect, useState } from "react";

import {
  Tabs,
  Tab,
  Container,
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  Badge,
  Table,
  Form,
  Carousel,
  Stack,
  Modal,
  Alert,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";

import {
  data,
  dataPlan,
  dynamicColors,
  randomColorArr,
} from "../../assets/testData";
import DataForm from "../common/DataForm";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, getElementAtEvent, getDatasetAtEvent } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import Zoom from "chartjs-plugin-zoom";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ReferenceLine } from "recharts";

import { useRef } from "react";
import { displayablePlans } from "../../assets/makeData";
import {
  formatAxisTitle,
  formatClusterId,
  formatColorFilterTitle,
  formatGetClusterAnalysisUrl,
  formatGetClusterAvgPlanBoundaryUrl,
  formatGetClusterSetAnalysisUrl,
  formatGetDistanceMeasureComparisonUrl,
  formatGetPlanBoundaryUrl,
  formatPlanId,
  getClusterId,
  parseClusterId,
  parsePlanId,
} from "../../../util/FormatUtil";
import { formatEnsembleId } from "../../../util/FormatUtil";
import api from "../../../api/client";
import { Label, XAxis, YAxis } from "recharts";
import { DMComparison } from "../clustering-pane/DMComparison";

function PlanScatterPlot({
  setIndex,
  selectedClusterIdx,
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  selectedEnsemble,
  selectedDistanceMeasure,
  clusterAnalysis,
  setIsLoading,
  selectedColorFilter,
  selectedAxisX,
  selectedAxisY,
}) {
  const chartRef = useRef();
  ChartJS.register(
    zoomPlugin,
    Zoom,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex === 0;
        },
      },
      datalabels: {
        color: "#36A2EB",
        formatter: function (value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  };

  if (clusterAnalysis === null) {
    return <div></div>;
  }

  const numOfDistricts = clusterAnalysis[0]["aAPercentages"].length;

  const planScatterPlotData = { labels: [], datasets: [] };

  const planScatterPlotCoordinates = [];
  const planScatterPlotLabels = [];
  const planScatterPlotLabelsUnavailable = [];

  const planScatterPlotCoordinatesDemSplit = [];
  const planScatterPlotCoordinatesRepSplit = [];
  const planScatterPlotCoordinatesNumOfAAOpp = [];
  const planScatterPlotCoordinatesNumOfAsianOpp = [];
  const planScatterPlotCoordinatesNumOfHispanicOpp = [];
  const planScatterPlotCoordinatesNumOfWhiteOpp = [];
  const planScatterPlotColorsVote = [];
  const planScatterPlotColorsNumOfAAOpp = [];
  const planScatterPlotColorsNumOfAsianOpp = [];
  const planScatterPlotColorsNumOfHispanicOpp = [];
  const planScatterPlotColorsNumOfWhiteOpp = [];

  const getVoteColor = (demSplit, repSplit) => {
    return demSplit > repSplit
      ? "rgba(50, 99, 255, 0.5)"
      : "rgba(255, 99, 132, 0.5)";
  };

  const getOppsColor = (numOfOpps, numOfDistricts) => {
    let opacity = 0;

    if (numOfOpps === 0) {
      opacity = 0;
    } else if (numOfOpps === numOfDistricts) {
      opacity = 1;
    } else if (numOfOpps > numOfDistricts / 1.2) {
      opacity = 0.8;
    } else if (numOfOpps > numOfDistricts / 1.5) {
      opacity = 0.6;
    } else if (numOfOpps > numOfDistricts / 2) {
      opacity = 0.4;
    } else if (numOfOpps > numOfDistricts / 3) {
      opacity = 0.2;
    } else {
      opacity = 0.1;
    }

    return `rgba(100,50,255, ${opacity})`;
  };

  Array.from(clusterAnalysis).forEach((plan, i) => {
    if (plan["availability"] === true) {
      planScatterPlotCoordinates.push({
        x: plan["coordinate"][0],
        y: plan["coordinate"][1],
        r: 6,
      });
      planScatterPlotLabels.push(plan["name"]);
      planScatterPlotCoordinatesDemSplit.push(plan["democraticSplit"].length);
      planScatterPlotCoordinatesRepSplit.push(plan["republicanSplit"].length);
      planScatterPlotCoordinatesNumOfAAOpp.push(plan["numOfAAOpp"]);
      planScatterPlotCoordinatesNumOfAsianOpp.push(plan["numOfAsianOpp"]);
      planScatterPlotCoordinatesNumOfHispanicOpp.push(plan["numOfHispanicOpp"]);
      planScatterPlotCoordinatesNumOfWhiteOpp.push(plan["numOfWhiteOpp"]);
      planScatterPlotColorsVote.push(
        getVoteColor(plan["democraticSplit"], plan["republicanSplit"])
      );
      planScatterPlotColorsNumOfAAOpp.push(
        getOppsColor(plan["numOfAAOpp"], numOfDistricts)
      );
      planScatterPlotColorsNumOfAsianOpp.push(
        getOppsColor(plan["numOfAsianOpp"], numOfDistricts)
      );
      planScatterPlotColorsNumOfHispanicOpp.push(
        getOppsColor(plan["numOfHispanicOpp"], numOfDistricts)
      );
      planScatterPlotColorsNumOfWhiteOpp.push(
        getOppsColor(plan["numOfWhiteOpp"], numOfDistricts)
      );
    } else {
      planScatterPlotCoordinates.push({
        x: plan["coordinate"][0],
        y: plan["coordinate"][1],
        r: 3,
      });
      planScatterPlotLabels.push(plan["name"]);
      planScatterPlotCoordinatesDemSplit.push(plan["democraticSplit"].length);
      planScatterPlotCoordinatesRepSplit.push(plan["republicanSplit"].length);
      planScatterPlotCoordinatesNumOfAAOpp.push(plan["numOfAAOpp"]);
      planScatterPlotCoordinatesNumOfAsianOpp.push(plan["numOfAsianOpp"]);
      planScatterPlotCoordinatesNumOfHispanicOpp.push(plan["numOfHispanicOpp"]);
      planScatterPlotCoordinatesNumOfWhiteOpp.push(plan["numOfWhiteOpp"]);
    }
  });

  let coords = [];
  let coordsUnavailable = [];

  let colorArr = [];

  switch (selectedColorFilter) {
    case "voteSplit":
      colorArr = planScatterPlotColorsVote;
      break;
    case "avgNumOfAAOpps":
      colorArr = planScatterPlotColorsNumOfAAOpp;
      break;
    case "avgNumOfAsianOpps":
      colorArr = planScatterPlotColorsNumOfAsianOpp;
      break;
    case "avgNumOfHispanicOpps":
      colorArr = planScatterPlotColorsNumOfHispanicOpp;
      break;
    case "avgNumOfWhiteOpps":
      colorArr = planScatterPlotColorsNumOfWhiteOpp;
      break;
    default:
      colorArr = planScatterPlotColorsVote;
      break;
  }

  let coordXArr = [];

  switch (selectedAxisX) {
    case "default":
      break;
    case "avgDemocraticSplit":
      coordXArr = planScatterPlotCoordinatesDemSplit;
      break;
    case "avgRepublicanSplit":
      coordXArr = planScatterPlotCoordinatesRepSplit;
      break;
    case "avgNumOfAAOpps":
      coordXArr = planScatterPlotCoordinatesNumOfAAOpp;
      break;
    case "avgNumOfAsianOpps":
      coordXArr = planScatterPlotCoordinatesNumOfAsianOpp;
      break;
    case "avgNumOfHispanicOpps":
      coordXArr = planScatterPlotCoordinatesNumOfHispanicOpp;
      break;
    case "avgNumOfWhiteOpps":
      coordXArr = planScatterPlotCoordinatesNumOfWhiteOpp;
      break;
    default:
      coordXArr = planScatterPlotCoordinates;
      break;
  }

  let coordYArr = [];

  switch (selectedAxisY) {
    case "default":
      break;
    case "avgDemocraticSplit":
      coordYArr = planScatterPlotCoordinatesDemSplit;
      break;
    case "avgRepublicanSplit":
      coordYArr = planScatterPlotCoordinatesRepSplit;
      break;
    case "avgNumOfAAOpps":
      coordYArr = planScatterPlotCoordinatesNumOfAAOpp;
      break;
    case "avgNumOfAsianOpps":
      coordYArr = planScatterPlotCoordinatesNumOfAsianOpp;
      break;
    case "avgNumOfHispanicOpps":
      coordYArr = planScatterPlotCoordinatesNumOfHispanicOpp;
      break;
    case "avgNumOfWhiteOpps":
      coordYArr = planScatterPlotCoordinatesNumOfWhiteOpp;
      break;
    default:
      coordYArr = planScatterPlotCoordinates;
      break;
  }

  console.log("coordXArr");
  console.log(coordXArr);

  Array.from(clusterAnalysis).forEach((plan, i) => {
    if (plan["availability"] === true) {
      coords.push({
        x:
          selectedAxisX === "default"
            ? planScatterPlotCoordinates[i]["x"]
            : coordXArr[i],
        y:
          selectedAxisY === "default"
            ? planScatterPlotCoordinates[i]["y"]
            : coordYArr[i],
        r: 6,
      });
    } else {
      coordsUnavailable.push({
        x:
          selectedAxisX === "default"
            ? planScatterPlotCoordinates[i]["x"]
            : coordXArr[i],
        y:
          selectedAxisY === "default"
            ? planScatterPlotCoordinates[i]["y"]
            : coordYArr[i],
        r: 3,
      });
    }
  });

  console.log("plan coords");
  console.log(coords);

  const coordsDomain = [
    { x: -1, y: -1, r: 0 },
    { x: 1, y: 1, r: 0 },
    { x: 1, y: -1, r: 0 },
    { x: -1, y: 1, r: 0 },
  ];

  planScatterPlotData.datasets.push({
    type: "bubble",
    label: "Available Plan",
    labels: planScatterPlotLabels,
    data: coords,
    backgroundColor: colorArr,
    datalabels: {
      color: "black",
    },
  });

  planScatterPlotData.datasets.push({
    type: "bubble",
    label: "Unavailable Plan",
    labels: planScatterPlotLabelsUnavailable,
    data: coordsUnavailable,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  });

  planScatterPlotData.datasets.push({
    type: "bubble",
    label: "Click to see relative coordinates",
    data: coordsDomain,
    backgroundColor: null,
    borderColor: null,
    borderWidth: 0,
  });

  // Plan scatter plot: send request to get geojson of the plan
  const onClick = (e) => {
    const datasetArr = Array.from(getDatasetAtEvent(chartRef.current, e));

    if (datasetArr.length === 0) {
      return;
    }

    if (datasetArr[0].datasetIndex === 1) {
      return;
    }

    const elementArr = Array.from(getElementAtEvent(chartRef.current, e));

    if (elementArr.length === 0) {
      return;
    }

    console.log(datasetArr);
    console.log(elementArr);

    const elementIdx = elementArr[0].index;
    const selectedPlanIdx = parsePlanId(
      clusterAnalysis.filter((plan) => plan["availability"] == true)[
        elementIdx
      ]["name"]
    );

    const planId = formatPlanId(
      selectedState,
      selectedEnsemble,
      selectedPlanIdx
    );

    console.log("selected plan idx");
    console.log(planId);

    let url = formatGetPlanBoundaryUrl(planId);

    console.log("get plan boundary url");
    console.log(url);

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        console.log(data);
        const newDisplayedPlans = [
          ...displayedPlans,
          {
            type: "plan",
            id: selectedPlanIdx,
            parent: selectedClusterIdx,
            geometry: data,
          },
        ];

        setDisplayedPlans(newDisplayedPlans);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Container className="justify-content-center">
      <Row
        style={{
          width: "700px",
          height: "300px",
          justifyContent: "center",
          paddingBottom: "30px",
        }}
      >
        <Chart
          ref={chartRef}
          type="scatter"
          options={options}
          data={planScatterPlotData}
          onClick={onClick}
        >
          <XAxis
            dataKey={"x"}
            name="x"
            ticks={[100, 120, 140, 160, 180]}
            domain={[80, 200]}
            type="number"
          />
          <YAxis type="number" domain={[0, 1]} />
        </Chart>
      </Row>
      <div className="axisY">{formatAxisTitle(selectedAxisY)}</div>
      <div className="axisX">{formatAxisTitle(selectedAxisX)}</div>
    </Container>
  );
}

function ClusterScatterPlot({
  setIndex,
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  selectedEnsemble,
  selectedDistanceMeasure,
  setSelectedClusterIdx,
  clusterSetAnalysis,
  setClusterAnalysis,
  setIsLoading,
  selectedColorFilter,
  selectedAxisX,
  selectedAxisY,
}) {
  const chartRef = useRef();

  ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

  const options = {
    plugins: {
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex === 0;
        },
      },
      datalabels: {
        color: "#36A2EB",
        formatter: function (value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  };

  if (clusterSetAnalysis === null) {
    return <div></div>;
  }

  const numOfDistricts = clusterSetAnalysis[0]["aAPercentages"][0].length;

  const clusterSetScatterPlotData = { labels: [], datasets: [] };

  const clusterSetScatterPlotCoordinates = [];

  const clusterSetScatterPlotCoordinatesDemSplit = [];
  const clusterSetScatterPlotCoordinatesRepSplit = [];
  const clusterSetScatterPlotCoordinatesAvgNumOfAAOpps = [];
  const clusterSetScatterPlotCoordinatesAvgNumOfAsianOpps = [];
  const clusterSetScatterPlotCoordinatesAvgNumOfHispanicOpps = [];
  const clusterSetScatterPlotCoordinatesAvgNumOfWhiteOpps = [];
  const clusterSetScatterPlotColorsVote = [];
  const clusterSetScatterPlotColorsAvgNumOfAAOpps = [];
  const clusterSetScatterPlotColorsAvgNumOfAsianOpps = [];
  const clusterSetScatterPlotColorsAvgNumOfHispanicOpps = [];
  const clusterSetScatterPlotColorsAvgNumOfWhiteOpps = [];
  const clusterSetScatterPlotSize = [];

  const maxNumOfPlans = Math.max(
    ...Array.from(clusterSetAnalysis).map((cluster) => cluster["numOfPlans"])
  );

  const getVoteColor = (demSplit, repSplit) => {
    return demSplit > repSplit
      ? "rgba(50, 99, 255, 0.3)"
      : "rgba(255, 99, 132, 0.3)";
  };

  // get Opportunity Districts scatter plot point color based on avg num of opps. Less opps have color closer to white, more opps have color closer to purple.
  const getOppsColor = (avgNumOfOpps, numOfDistricts) => {
    let opacity = 0;

    if (avgNumOfOpps === 0) {
      opacity = 0;
    } else if (avgNumOfOpps === numOfDistricts) {
      opacity = 1;
    } else if (avgNumOfOpps > numOfDistricts / 1.2) {
      opacity = 0.8;
    } else if (avgNumOfOpps > numOfDistricts / 1.5) {
      opacity = 0.6;
    } else if (avgNumOfOpps > numOfDistricts / 2) {
      opacity = 0.4;
    } else if (avgNumOfOpps > numOfDistricts / 3) {
      opacity = 0.2;
    } else {
      opacity = 0.1;
    }

    return `rgba(100,50,255, ${opacity})`;
  };

  Array.from(clusterSetAnalysis).forEach((cluster, i) => {
    clusterSetScatterPlotData.labels.push(cluster["name"]);
    clusterSetScatterPlotCoordinates.push({
      x: cluster["coordinate"][0],
      y: cluster["coordinate"][1],
      r: (cluster["numOfPlans"] / maxNumOfPlans) * 20,
    });
    clusterSetScatterPlotSize.push(
      (cluster["numOfPlans"] / maxNumOfPlans) * 20
    );
    clusterSetScatterPlotCoordinatesDemSplit.push(
      cluster["avgDemocraticSplit"]
    );
    clusterSetScatterPlotCoordinatesRepSplit.push(
      cluster["avgRepublicanSplit"]
    );
    clusterSetScatterPlotCoordinatesAvgNumOfAAOpps.push(
      cluster["avgNumOfAAOpps"]
    );
    clusterSetScatterPlotCoordinatesAvgNumOfAsianOpps.push(
      cluster["avgNumOfAsianOpps"]
    );
    clusterSetScatterPlotCoordinatesAvgNumOfHispanicOpps.push(
      cluster["avgNumOfHispanicOpps"]
    );
    clusterSetScatterPlotCoordinatesAvgNumOfWhiteOpps.push(
      cluster["avgNumOfWhiteOpps"]
    );
    clusterSetScatterPlotColorsVote.push(
      getVoteColor(cluster["avgDemocraticSplit"], cluster["avgRepublicanSplit"])
    );
    clusterSetScatterPlotColorsAvgNumOfAAOpps.push(
      getOppsColor(cluster["avgNumOfAAOpps"], numOfDistricts)
    );
    clusterSetScatterPlotColorsAvgNumOfAsianOpps.push(
      getOppsColor(cluster["avgNumOfAsianOpps"], numOfDistricts)
    );
    clusterSetScatterPlotColorsAvgNumOfHispanicOpps.push(
      getOppsColor(cluster["avgNumOfHispanicOpps"], numOfDistricts)
    );
    clusterSetScatterPlotColorsAvgNumOfWhiteOpps.push(
      getOppsColor(cluster["avgNumOfWhiteOpps"], numOfDistricts)
    );
  });

  let coords = [];

  let colorArr = [];

  switch (selectedColorFilter) {
    case "voteSplit":
      colorArr = clusterSetScatterPlotColorsVote;
      break;
    case "avgNumOfAAOpps":
      colorArr = clusterSetScatterPlotColorsAvgNumOfAAOpps;
      break;
    case "avgNumOfAsianOpps":
      colorArr = clusterSetScatterPlotColorsAvgNumOfAsianOpps;
      break;
    case "avgNumOfHispanicOpps":
      colorArr = clusterSetScatterPlotColorsAvgNumOfHispanicOpps;
      break;
    case "avgNumOfWhiteOpps":
      colorArr = clusterSetScatterPlotColorsAvgNumOfWhiteOpps;
      break;
    default:
      colorArr = clusterSetScatterPlotColorsVote;
      break;
  }

  let coordXArr = [];

  switch (selectedAxisX) {
    case "default":
      break;
    case "avgDemocraticSplit":
      coordXArr = clusterSetScatterPlotCoordinatesDemSplit;
      break;
    case "avgRepublicanSplit":
      coordXArr = clusterSetScatterPlotCoordinatesRepSplit;
      break;
    case "avgNumOfAAOpps":
      coordXArr = clusterSetScatterPlotCoordinatesAvgNumOfAAOpps;
      break;
    case "avgNumOfAsianOpps":
      coordXArr = clusterSetScatterPlotCoordinatesAvgNumOfAsianOpps;
      break;
    case "avgNumOfHispanicOpps":
      coordXArr = clusterSetScatterPlotCoordinatesAvgNumOfHispanicOpps;
      break;
    case "avgNumOfWhiteOpps":
      coordXArr = clusterSetScatterPlotCoordinatesAvgNumOfWhiteOpps;
      break;
    default:
      coordXArr = clusterSetScatterPlotCoordinates;
      break;
  }

  let coordYArr = [];

  switch (selectedAxisY) {
    case "default":
      break;
    case "avgDemocraticSplit":
      coordYArr = clusterSetScatterPlotCoordinatesDemSplit;
      break;
    case "avgRepublicanSplit":
      coordYArr = clusterSetScatterPlotCoordinatesRepSplit;
      break;
    case "avgNumOfAAOpps":
      coordYArr = clusterSetScatterPlotCoordinatesAvgNumOfAAOpps;
      break;
    case "avgNumOfAsianOpps":
      coordYArr = clusterSetScatterPlotCoordinatesAvgNumOfAsianOpps;
      break;
    case "avgNumOfHispanicOpps":
      coordYArr = clusterSetScatterPlotCoordinatesAvgNumOfHispanicOpps;
      break;
    case "avgNumOfWhiteOpps":
      coordYArr = clusterSetScatterPlotCoordinatesAvgNumOfWhiteOpps;
      break;
    default:
      coordYArr = clusterSetScatterPlotCoordinates;
      break;
  }

  Array.from(clusterSetAnalysis).forEach((cluster, i) => {
    coords.push({
      x:
        selectedAxisX === "default"
          ? clusterSetScatterPlotCoordinates[i]["x"]
          : coordXArr[i],
      y:
        selectedAxisY === "default"
          ? clusterSetScatterPlotCoordinates[i]["y"]
          : coordYArr[i],
      r: (cluster["numOfPlans"] / maxNumOfPlans) * 20,
    });
  });

  const coordsDomain = [
    { x: -1, y: -1, r: 0 },
    { x: 1, y: 1, r: 0 },
    { x: 1, y: -1, r: 0 },
    { x: -1, y: 1, r: 0 },
  ];

  clusterSetScatterPlotData.datasets.push({
    type: "bubble",
    label: "Cluster",
    data: coords,
    backgroundColor: colorArr,
    datalabels: {
      color: "black",
    },
  });

  clusterSetScatterPlotData.datasets.push({
    type: "bubble",
    label: "Click to see relative coordinates",
    data: coordsDomain,
    backgroundColor: null,
    borderColor: null,
    borderWidth: 0,
    datalabels: {
      color: null,
    },
  });

  // Cluster scatter plot: send request to get geojson of the cluster
  const onClick = (e) => {
    const elementArr = Array.from(getElementAtEvent(chartRef.current, e));
    if (elementArr.length === 0) {
      return;
    }

    const elementIdx = elementArr[0].index;
    const selectedClusterIdx = parseClusterId(
      clusterSetAnalysis[elementIdx]["name"]
    );
    console.log(selectedClusterIdx);
    const clusterId = formatClusterId(
      selectedState,
      selectedEnsemble,
      selectedDistanceMeasure,
      selectedClusterIdx
    );

    let url = formatGetClusterAvgPlanBoundaryUrl(clusterId);

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        const newDisplayedPlans = [
          ...displayedPlans,
          {
            type: "cluster",
            id: selectedClusterIdx,
            parent: null,
            geometry: data,
          },
        ];
        setDisplayedPlans(newDisplayedPlans);
        setSelectedClusterIdx(selectedClusterIdx);
        setIndex(1);
      })
      .finally(() => setIsLoading(false));

    url = formatGetClusterAnalysisUrl(clusterId);

    console.log("get cluster analysis url");
    console.log(url);

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        setClusterAnalysis(data);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Container className="justify-content-center">
      <Row
        style={{
          width: "700px",
          height: "300px",
          justifyContent: "center",
          paddingBottom: "30px",
        }}
      >
        <Chart
          ref={chartRef}
          type="scatter"
          options={options}
          data={clusterSetScatterPlotData}
          onClick={onClick}
          plugins={[ChartDataLabels]}
        />
      </Row>
      <div className="axisY">{formatAxisTitle(selectedAxisY)}</div>
      <div className="axisX">{formatAxisTitle(selectedAxisX)}</div>
    </Container>
  );
}

export default function ClusterPlotForm({
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  selectedEnsemble,
  selectedDistanceMeasure,
  setSelectedDistanceMeasure,
  clusterSetAnalysis,
  setClusterSetAnalysis,
  clusterAnalysis,
  setClusterAnalysis,
  setIsLoading,
}) {
  const [distanceMeasureComparison, setDistanceMeasureComparison] =
    useState(null);
  const [showTabularSummary, setShowTabularSummary] = useState(false);
  const [showAdjustFilter, setShowAdjustFilter] = useState(false);
  const [showChangeViewSettings, setShowChangeViewSettings] = useState(false);
  const [showClusteringMethodEvaluation, setShowClusteringMethodEvaluation] =
    useState(false);

  const [index, setIndex] = useState(0);

  const [selectedClusterIdx, setSelectedClusterIdx] = useState(0);

  const [selectedColorFilter, setSelectedColorFilter] = useState("voteSplit");
  const [selectedAxisX, setSelectedAxisX] = useState("default");
  const [selectedAxisY, setSelectedAxisY] = useState("default");

  const handleCloseTabularSummary = () => setShowTabularSummary(false);
  const handleShowTabularSummary = () => setShowTabularSummary(true);
  const handleCloseAdjustFilter = () => setShowAdjustFilter(false);
  const handleShowAdjustFilter = () => setShowAdjustFilter(true);
  const handleCloseChangeViewSettings = () => setShowChangeViewSettings(false);
  const handleShowChangeViewSettings = () => setShowChangeViewSettings(true);
  const handleCloseClusteringMethodEvaluation = () =>
    setShowClusteringMethodEvaluation(false);
  const handleShowClusteringMethodEvaluation = () =>
    setShowClusteringMethodEvaluation(true);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleSelectDistanceMeasure = (key) => {
    console.log(key);

    if (key === "cluster") {
      const url = formatGetClusterSetAnalysisUrl(
        formatEnsembleId(selectedState, selectedEnsemble),
        selectedDistanceMeasure
      );

      setIsLoading(true);
      api
        .get(url)
        .then((res) => {
          const data = res.data;
          setClusterSetAnalysis(data);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleChangeColorFilter = (e) => {
    const id = e.target.id;
    setSelectedColorFilter(id);
  };

  const handleChangeAxisX = (e) => {
    const id = e.target.id;
    setSelectedAxisX(id);
  };

  const handleChangeAxisY = (e) => {
    const id = e.target.id;
    setSelectedAxisY(id);
  };

  useEffect(() => {
    const url = formatGetDistanceMeasureComparisonUrl(
      formatEnsembleId(selectedState, selectedEnsemble)
    );

    console.log(url);

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        setDistanceMeasureComparison(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedEnsemble, selectedState, setIsLoading, setClusterSetAnalysis]);

  useEffect(() => {
    const url = formatGetClusterSetAnalysisUrl(
      formatEnsembleId(selectedState, selectedEnsemble),
      selectedDistanceMeasure
    );

    console.log(url);

    setIsLoading(true);
    api
      .get(url)
      .then((res) => {
        const data = res.data;
        setClusterSetAnalysis(data);
      })
      .finally(() => {
        setIsLoading(false);
        setIndex(0);
      });
  }, [
    selectedDistanceMeasure,
    selectedEnsemble,
    selectedState,
    setIsLoading,
    setClusterSetAnalysis,
  ]);

  if (distanceMeasureComparison === null) {
    return <div>ERROR: NO_ENSEMBLE_SELECTED</div>;
  }

  console.log("distanceMeasureComparison");
  console.log(distanceMeasureComparison);

  return (
    <DataForm headerText={"ClusterPlotForm"}>
      <Row className="mb-3 align-middle">
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Stack direction="horizontal" gap={3}>
                <span>Scatter Plot of </span>
                <Breadcrumb>
                  {index === 0 ? (
                    <Breadcrumb.Item
                      active
                    >{`Ensemble ${selectedEnsemble}`}</Breadcrumb.Item>
                  ) : (
                    <>
                      <Breadcrumb.Item onClick={() => setIndex(0)}>
                        {`Ensemble ${selectedEnsemble}`}
                      </Breadcrumb.Item>
                      <Breadcrumb.Item active>
                        {`Cluster ${selectedClusterIdx}`}
                      </Breadcrumb.Item>
                    </>
                  )}
                </Breadcrumb>
              </Stack>
            </Card.Header>
            <Card.Body>
              <Carousel
                data-bs-theme="dark"
                activeIndex={index}
                onSelect={handleSelect}
                slide={true}
                interval={null}
                controls={false}
                indicators={false}
              >
                <Carousel.Item>
                  <ClusterScatterPlot
                    setIndex={setIndex}
                    displayedPlans={displayedPlans}
                    setDisplayedPlans={setDisplayedPlans}
                    selectedState={selectedState}
                    selectedEnsemble={selectedEnsemble}
                    selectedDistanceMeasure={selectedDistanceMeasure}
                    setSelectedClusterIdx={setSelectedClusterIdx}
                    clusterSetAnalysis={clusterSetAnalysis}
                    setClusterAnalysis={setClusterAnalysis}
                    setIsLoading={setIsLoading}
                    selectedColorFilter={selectedColorFilter}
                    selectedAxisX={selectedAxisX}
                    selectedAxisY={selectedAxisY}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <PlanScatterPlot
                    selectedClusterIdx={selectedClusterIdx}
                    displayedPlans={displayedPlans}
                    setDisplayedPlans={setDisplayedPlans}
                    selectedState={selectedState}
                    selectedEnsemble={selectedEnsemble}
                    selectedDistanceMeasure={selectedDistanceMeasure}
                    clusterAnalysis={clusterAnalysis}
                    setIsLoading={setIsLoading}
                    selectedColorFilter={selectedColorFilter}
                    selectedAxisX={selectedAxisX}
                    selectedAxisY={selectedAxisY}
                  />
                </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}></Col>
      </Row>
      <Row className="mb-3">
        <Col lg={6}>
          <Card>
            <Card.Header>Adjust Color Filter</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <DropdownButton
                    id="dropdownColorFilter"
                    title={
                      "Current: " + formatColorFilterTitle(selectedColorFilter)
                    }
                  >
                    <Dropdown.Item
                      id="voteSplit"
                      onClick={handleChangeColorFilter}
                    >
                      Voting Split (Democratic: Blue, Republican: Red)
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfAAOpps"
                      onClick={handleChangeColorFilter}
                    >
                      Avg. Num. of AA Opp. (Low: White, High: Purple)
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfAsianOpps"
                      onClick={handleChangeColorFilter}
                    >
                      Avg. Num. of Asian Opp. (Low: White, High: Purple)
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfHispanicOpps"
                      onClick={handleChangeColorFilter}
                    >
                      Avg. Num. of Hispanic Opp. (Low: White, High: Purple)
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfWhiteOpps"
                      onClick={handleChangeColorFilter}
                    >
                      Avg. Num. of White Opp. (Low: White, High: Purple)
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Header>Adjust Plot Axis</Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <DropdownButton
                    id="dropdownAxisX"
                    title={"X Axis: " + formatAxisTitle(selectedAxisX)}
                  >
                    <Dropdown.Item id="default" onClick={handleChangeAxisX}>
                      Default
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgDemocraticSplit"
                      onClick={handleChangeAxisX}
                    >
                      Avg. Democratic Split
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgRepublicanSplit"
                      onClick={handleChangeAxisX}
                    >
                      Avg. Republican Split
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfAAOpps"
                      onClick={handleChangeAxisX}
                    >
                      Avg. Num. of AA Opp.
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfAsianOpps"
                      onClick={handleChangeAxisX}
                    >
                      Avg. Num. of Asian Opp.
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfHispanicOpps"
                      onClick={handleChangeAxisX}
                    >
                      Avg. Num. of Hispanic Opp.
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfWhiteOpps"
                      onClick={handleChangeAxisX}
                    >
                      Avg. Num. of White Opp.
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              <Row>
                <Col>
                  <DropdownButton
                    id="dropdownAxisY"
                    title={"Y Axis: " + formatAxisTitle(selectedAxisY)}
                  >
                    <Dropdown.Item id="default" onClick={handleChangeAxisY}>
                      Default
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgDemocraticSplit"
                      onClick={handleChangeAxisY}
                    >
                      Avg. Democratic Split
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgRepublicanSplit"
                      onClick={handleChangeAxisY}
                    >
                      Avg. Republican Split
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfAAOpps"
                      onClick={handleChangeAxisY}
                    >
                      Avg. Num. of AA Opp.
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfAsianOpps"
                      onClick={handleChangeAxisY}
                    >
                      Avg. Num. of Asian Opp.
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfHispanicOpps"
                      onClick={handleChangeAxisY}
                    >
                      Avg. Num. of Hispanic Opp.
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="avgNumOfWhiteOpps"
                      onClick={handleChangeAxisY}
                    >
                      Avg. Num. of White Opp.
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DataForm>
  );
}
