import { Tabs, Tab } from "react-bootstrap";

import ClusterPlotForm from "../form/ClusterPlotForm";
import ClusterTableForm from "../form/ClusterTableForm";
import EnsembleInfoForm from "../form/EnsembleInfoForm";
import ContentsContainer from "../layout/ContentsContainer";
import StateInfoForm from "../form/StateInfoForm";

export default function AnalysisWrapper() {
  return (
    <ContentsContainer>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey={"state"} title={"State Information"}>
          <StateInfoForm />
        </Tab>
        <Tab eventKey="home" title="Manage Ensembles">
          <EnsembleInfoForm />
        </Tab>
        <Tab eventKey="profile" title="Manage Clusters">
          <ClusterPlotForm />
        </Tab>
        <Tab eventKey="contact" title="Cluster Pattern">
          <ClusterTableForm />
        </Tab>
      </Tabs>
    </ContentsContainer>
  );
}
