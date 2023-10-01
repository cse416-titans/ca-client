import { Tabs, Tab } from "react-bootstrap";

import ClusterPlotForm from "./ClusterPlotForm";
import ClusterTableForm from "./ClusterTableForm";
import EnsembleInfoForm from "./EnsembleInfoForm";
import ContentsContainer from "./layout/ContentsContainer";

export default function AnalysisContainer() {
  return (
    <ContentsContainer>
      <Tabs
        defaultActiveKey="ensemble"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="ensemble">
          <EnsembleInfoForm />
        </Tab>
        <Tab eventKey="profile" title="graph">
          <ClusterPlotForm />
        </Tab>
        <Tab eventKey="contact" title="table">
          <ClusterTableForm />
        </Tab>
      </Tabs>
    </ContentsContainer>
  );
}
