import { Tabs, Tab } from "react-bootstrap";

import ClusterPlotForm from "../form/ClusterPlotForm";
import ClusterTableForm from "../form/ClusterTableForm";
import EnsembleInfoForm from "../form/EnsembleInfoForm";
import ContentsContainer from "../layout/ContentsContainer";
import StateInfoForm from "../form/StateInfoForm";

export default function AnalysisWrapper({
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  setSelectedState,
  setshowCurrentDistrictPlan,
}) {
  return (
    <ContentsContainer>
      <Tabs
        defaultActiveKey="state"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
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
