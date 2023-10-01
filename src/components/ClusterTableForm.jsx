import { Container, Table } from "react-bootstrap";

import DataForm from "./common/DataForm";

function ClusterTable() {
  return (
    <Container className="overflow-y-scroll" style={{ height: "500px" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cluster</th>
            <th>Voting Margin</th>
            <th>Demographic Margin</th>
            <th>Income Margin</th>
            <th>Compactness Index</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 100 }).map((_, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{Math.random().toFixed(2)}</td>
              <td>{Math.random().toFixed(2)}</td>
              <td>{Math.random().toFixed(2)}</td>
              <td>{Math.random().toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default function ClusterTableForm() {
  return (
    <DataForm headerText={"ClusterTableForm"}>
      <ClusterTable />
    </DataForm>
  );
}
