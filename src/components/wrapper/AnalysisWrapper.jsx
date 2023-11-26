import { Tabs, Tab } from "react-bootstrap";

import ClusterPlotForm from "../form/ClusterPlotForm";
import ClusterTableForm from "../form/ClusterTableForm";
import EnsembleInfoForm from "../form/EnsembleInfoForm";
import ContentsContainer from "../layout/ContentsContainer";
import StateInfoForm from "../form/StateInfoForm";
import ClientSeverForm from "../form/ClientServerForm";

export default function AnalysisWrapper({
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  setSelectedState,
  setshowCurrentDistrictPlan,
}) {
  /*
    DESC:
      1. StateInfoForm
        1) state select
      2. EnsembleInfoForm
        1) when state selected, ensemble select
        2) display ensemble summary
        3) display cluster size bound for all distance measures
      3. ClusterPlotForm
        1) Clusters Overview
          a. when state, ensemble, distance measure selected, display scatter plot of clusters
        2) Clustering Method
          a. when state, ensemble selected, distance measure select
          b. display distance measure evaluation
      4. ClusterTableForm
        1) when state, ensemble, distance measure selected, display cluster summary table
        2) when cluster selected, display plan summary table
        3) map toggle -> display plan/cluster on map.
          a. send request to server (/AZ/ensemble-1/clusterset-1/cluster-1/plan-1 OR /AZ/ensemble-1/clusterset-1/cluster-1)
          b. add/pop plan/cluster id & fetched geojson e.g., plan-1/cluster-1 to displayedPlans
  */
  return (
    <ContentsContainer>
      <Tabs
        defaultActiveKey="state"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {/*<Tab eventKey="test" title="Client/Server Test">
          {<ClientSeverForm />}
  </Tab>*/}
        <Tab eventKey={"state"} title={"State Information"}>
          <StateInfoForm
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            setshowCurrentDistrictPlan={setshowCurrentDistrictPlan}
          />
        </Tab>
        <Tab eventKey="home" title="Manage My Ensemble">
          <EnsembleInfoForm />
        </Tab>
        <Tab eventKey="profile" title="Manage Clusters">
          <ClusterPlotForm
            displayedPlans={displayedPlans}
            setDisplayedPlans={setDisplayedPlans}
          />
        </Tab>
        <Tab eventKey="contact" title="Cluster Pattern">
          <ClusterTableForm
            displayedPlans={displayedPlans}
            setDisplayedPlans={setDisplayedPlans}
          />
        </Tab>
      </Tabs>
    </ContentsContainer>
  );
}
