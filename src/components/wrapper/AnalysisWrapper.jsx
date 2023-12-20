import { Tabs, Tab } from "react-bootstrap";

import ClusterPlotForm from "../form/ClusterPlotForm";
import ClusterTableForm from "../form/ClusterTableForm";
import EnsembleInfoForm from "../form/EnsembleInfoForm";
import ContentsContainer from "../layout/ContentsContainer";
import StateInfoForm from "../form/StateInfoForm";
import ClientSeverForm from "../form/ClientServerForm";
import {
  formatClusterSetId,
  formatEnsembleId,
  formatGetClusterSetAnalysisUrl,
} from "../../../util/FormatUtil";
import api from "../../../api/client";
import { useState } from "react";

export default function AnalysisWrapper({
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  setSelectedState,
  selectedEnsemble,
  setselectedEnsemble,
  selectedDistanceMeasure,
  setSelectedDistanceMeasure,
  setShowCurrentDistrictPlan,
  setCurrentlyEnactedPlan,
  setIsLoading,
  currentlyEnactedPlan,
  showInitial,
  setShowInitial,
  AZSummary,
  LASummary,
  NVSummary,
  setAZSummary,
  setLASummary,
  setNVSummary,
}) {
  const [clusterSetAnalysis, setClusterSetAnalysis] = useState(null);
  const [clusterAnalysis, setClusterAnalysis] = useState(null);

  const handleTabSelect = (key) => {
    if (key === "clusterSet") {
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

  return (
    <ContentsContainer>
      <Tabs
        defaultActiveKey="state"
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={handleTabSelect}
      >
        <Tab eventKey={"state"} title={"State Overview"}>
          <StateInfoForm
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setShowCurrentDistrictPlan={setShowCurrentDistrictPlan}
            setCurrentlyEnactedPlan={setCurrentlyEnactedPlan}
            setIsLoading={setIsLoading}
            AZSummary={AZSummary}
            LASummary={LASummary}
            NVSummary={NVSummary}
            setAZSummary={setAZSummary}
            setLASummary={setLASummary}
            setNVSummary={setNVSummary}
            setShowInitial={setShowInitial}
          />
        </Tab>
        <Tab eventKey="ensemble" title="Manage My Ensemble">
          <EnsembleInfoForm
            selectedState={selectedState}
            selectedEnsemble={selectedEnsemble}
            setselectedEnsemble={setselectedEnsemble}
            selectedDistanceMeasure={selectedDistanceMeasure}
            setSelectedDistanceMeasure={setSelectedDistanceMeasure}
            setIsLoading={setIsLoading}
          />
        </Tab>
        <Tab eventKey="clusterSet" title="Manage My Clusters">
          <ClusterPlotForm
            displayedPlans={displayedPlans}
            setDisplayedPlans={setDisplayedPlans}
            selectedState={selectedState}
            selectedEnsemble={selectedEnsemble}
            selectedDistanceMeasure={selectedDistanceMeasure}
            setSelectedDistanceMeasure={setSelectedDistanceMeasure}
            clusterSetAnalysis={clusterSetAnalysis}
            setClusterSetAnalysis={setClusterSetAnalysis}
            clusterAnalysis={clusterAnalysis}
            setClusterAnalysis={setClusterAnalysis}
            setIsLoading={setIsLoading}
          />
        </Tab>
        <Tab eventKey="cluster" title="Cluster Pattern">
          <ClusterTableForm
            displayedPlans={displayedPlans}
            setDisplayedPlans={setDisplayedPlans}
            selectedState={selectedState}
            selectedEnsemble={selectedEnsemble}
            selectedDistanceMeasure={selectedDistanceMeasure}
            clusterSetAnalysis={clusterSetAnalysis}
            setClusterSetAnalysis={setClusterSetAnalysis}
            clusterAnalysis={clusterAnalysis}
            setClusterAnalysis={setClusterAnalysis}
            setIsLoading={setIsLoading}
            currentlyEnactedPlan={currentlyEnactedPlan}
          />
        </Tab>
      </Tabs>
    </ContentsContainer>
  );
}
