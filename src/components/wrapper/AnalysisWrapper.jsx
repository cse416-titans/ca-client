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
  setshowCurrentDistrictPlan,
}) {
  const [clusterSetAnalysis, setClusterSetAnalysis] = useState(null);
  const [clusterAnalysis, setClusterAnalysis] = useState(null);

  const handleTabSelect = (key) => {
    if (key === "clusterSet") {
      const url = formatGetClusterSetAnalysisUrl(
        formatEnsembleId(selectedState, selectedEnsemble),
        selectedDistanceMeasure
      );

      api.get(url).then((res) => {
        const data = res.data;
        setClusterSetAnalysis(data);
      });
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
        <Tab eventKey={"state"} title={"State Information"}>
          <StateInfoForm
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setshowCurrentDistrictPlan={setshowCurrentDistrictPlan}
          />
        </Tab>
        <Tab eventKey="ensemble" title="Manage My Ensemble">
          <EnsembleInfoForm
            selectedEnsemble={selectedEnsemble}
            setselectedEnsemble={setselectedEnsemble}
          />
        </Tab>
        <Tab eventKey="clusterSet" title="Manage Clusters">
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
          />
        </Tab>
      </Tabs>
    </ContentsContainer>
  );
}
