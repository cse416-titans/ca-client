import { Tabs, Tab } from "react-bootstrap";

import ClusterPlotForm from "./ClusterPlotForm";
import ClusterTableForm from "./ClusterTableForm";
import EnsembleInfoForm from "./EnsembleInfoForm";
import ContentsContainer from "./layout/ContentsContainer";

export default function AnalysisContainer() {
  return (
    <ContentsContainer>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Manage Ensembles">
          <EnsembleInfoForm />
        </Tab>
        <Tab eventKey="profile" title="Manage Clusters">
          <ClusterPlotForm />
        </Tab>
        <Tab eventKey="contact" title="Cluster Pattern">
          <ClusterTableForm />
        </Tab>
        <Tab eventKey={"contact2"} title={"Vote Prediction"}></Tab>
      </Tabs>
    </ContentsContainer>
  );
}
