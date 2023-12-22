import React, { useMemo } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { usePagination, useTable } from "react-table";
import styled from "styled-components";

import axios from "axios";
import {
  makeData,
  makeDataClusterAndPlan,
  makeDataPlan,
} from "../../assets/makeData";
import {
  formatClusterId,
  formatGetClusterAnalysisUrl,
  formatGetClusterAvgPlanBoundaryUrl,
  formatGetPlanBoundaryUrl,
  formatPlanId,
  parseClusterId,
  parsePlanId,
} from "../../../util/FormatUtil";
import api from "../../../api/client";

const Styles = styled.div`
  padding: 1rem;

  thead {
    background-color: #f2f2f2;
  }

  tbody {
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #e6e6e6;
      transition: 0.1s;
    }
  }

  table {
    padding: 0;
    border-spacing: 0;
    border: 1px solid gray;
    font-size: 0.8rem;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.1rem;
      border-bottom: 1px solid gray;
      border-right: 1px solid gray;
      text-align: center;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0rem;
    margin: 2rem 0;
  }
`;

function TableExample({
  columns,
  data,
  setIndex,
  newPageSize,
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  selectedEnsemble,
  selectedDistanceMeasure,
  activeClusterIdx,
  setActiveClusterIdx,
  setClusterAnalysis,
  setIsLoading,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 15 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <Container className="justify-content-center align-middle text-center p-0">
      <Row className="px-5 mb-3">
        <Col>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"First"}
          </Button>
        </Col>
        <Col>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"Prev"}
          </Button>
        </Col>
        <Col>
          <span style={{ fontSize: "1rem" }}>
            {pageIndex + 1} / {pageOptions.length}
          </span>
        </Col>
        <Col>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {"Next"}
          </Button>
        </Col>
        <Col>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {"Last"}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <table {...getTableProps()} style={{ width: "100%" }}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, j) => (
                    <th key={j} {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, j) => {
                      let planType = "cluster";
                      if (row.cells[0].column.parent["Header"] === "Plan") {
                        planType = "plan";
                      }

                      if (cell.column.id === "showMap") {
                        if (cell.value === 1) {
                          return (
                            <td key={j} {...cell.getCellProps()}>
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                style={{ width: "100%" }}
                                checked={
                                  displayedPlans &&
                                  Array.from(displayedPlans).some(
                                    (plan) =>
                                      plan.id === row.cells[0].value &&
                                      plan.type === planType
                                  )
                                }
                                onChange={(e) => {
                                  const clusterId = formatClusterId(
                                    selectedState,
                                    selectedEnsemble,
                                    selectedDistanceMeasure,
                                    `${row.cells[0].value}`
                                  );

                                  const url =
                                    formatGetClusterAvgPlanBoundaryUrl(
                                      clusterId
                                    );

                                  if (e.target.checked) {
                                    setIsLoading(true);
                                    api
                                      .get(url)
                                      .then((res) => {
                                        const data = res.data;

                                        setDisplayedPlans([
                                          ...displayedPlans,
                                          {
                                            type: planType,
                                            id: row.cells[0].value,
                                            parent: activeClusterIdx,
                                            geometry: data,
                                          },
                                        ]);
                                      })
                                      .finally(() => setIsLoading(false));
                                  } else {
                                    setDisplayedPlans(
                                      displayedPlans.filter(
                                        (plan) =>
                                          plan.id !== row.cells[0].value ||
                                          plan.type !== planType
                                      )
                                    );
                                  }
                                }}
                              />
                            </td>
                          );
                        } else {
                          return (
                            <td key={j} {...cell.getCellProps()} style={{}}>
                              {" "}
                            </td>
                          );
                        }
                      } else if (cell.column.id === "gotoDetail") {
                        return (
                          <td
                            key={j}
                            {...cell.getCellProps()}
                            onClick={() => {
                              const clusterId = formatClusterId(
                                selectedState,
                                selectedEnsemble,
                                selectedDistanceMeasure,
                                `${row.cells[0].value}`
                              );

                              const url =
                                formatGetClusterAnalysisUrl(clusterId);

                              setIsLoading(true);

                              api
                                .get(url)
                                .then((res) => {
                                  const data = res.data;
                                  setClusterAnalysis(data);
                                  setIndex(1);
                                  setActiveClusterIdx(row.cells[0].value);
                                })
                                .finally(() => setIsLoading(false));
                            }}
                          >
                            {parseInt(cell.value) ? ">" : ""}
                          </td>
                        );
                      } else if (cell.column.id === "isCluster") {
                        return (
                          <td key={j} {...cell.getCellProps()}>
                            {parseInt(cell.value) ? "Cluster" : "Plan"}
                          </td>
                        );
                      }
                      return (
                        <td key={j} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}

function TableExamplePlan({
  columns,
  data,
  setIndex,
  newPageSize,
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  selectedEnsemble,
  selectedDistanceMeasure,
  activeClusterIdx,
  setActiveClusterIdx,
  setClusterAnalysis,
  setIsLoading,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: newPageSize },
      autoResetPage: false, // To prevent page reset on data change
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <Container className="justify-content-center align-middle text-center p-0">
      <Row className="px-5 mb-3">
        <Col>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"First"}
          </Button>
        </Col>
        <Col>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"Prev"}
          </Button>
        </Col>
        <Col>
          <span style={{ fontSize: "1rem" }}>
            {pageIndex + 1} / {pageOptions.length}
          </span>
        </Col>
        <Col>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {"Next"}
          </Button>
        </Col>
        <Col>
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {"Last"}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <table {...getTableProps()} style={{ width: "100%" }}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, j) => (
                    <th key={j} {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, j) => {
                      let planType = "cluster";
                      if (row.cells[0].column.parent["Header"] === "Plan") {
                        planType = "plan";
                      }

                      if (cell.column.id === "showMap") {
                        if (cell.value === 1) {
                          return (
                            <td key={j} {...cell.getCellProps()}>
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                style={{ width: "100%" }}
                                checked={
                                  displayedPlans &&
                                  Array.from(displayedPlans).some(
                                    (plan) =>
                                      plan.id === row.cells[0].value &&
                                      plan.type === planType
                                  )
                                }
                                onChange={(e) => {
                                  const planId = formatPlanId(
                                    selectedState,
                                    selectedEnsemble,
                                    `${row.cells[0].value}`
                                  );

                                  console.log("planId");
                                  console.log(planId);

                                  const url = formatGetPlanBoundaryUrl(planId);

                                  if (e.target.checked) {
                                    setIsLoading(true);
                                    api
                                      .get(url)
                                      .then((res) => {
                                        const data = res.data;

                                        setDisplayedPlans([
                                          ...displayedPlans,
                                          {
                                            type: planType,
                                            id: row.cells[0].value,
                                            parent: activeClusterIdx,
                                            geometry: data,
                                          },
                                        ]);
                                      })
                                      .finally(() => setIsLoading(false));
                                  } else {
                                    setDisplayedPlans(
                                      displayedPlans.filter(
                                        (plan) =>
                                          plan.id !== row.cells[0].value ||
                                          plan.type !== planType
                                      )
                                    );
                                  }
                                }}
                              />
                            </td>
                          );
                        } else {
                          return (
                            <td key={j} {...cell.getCellProps()} style={{}}>
                              {" "}
                            </td>
                          );
                        }
                      } else if (cell.column.id === "gotoDetail") {
                        return (
                          <td
                            key={j}
                            {...cell.getCellProps()}
                            onClick={() => {
                              const clusterId = formatClusterId(
                                selectedState,
                                selectedEnsemble,
                                selectedDistanceMeasure,
                                `${row.cells[0].value}`
                              );

                              const url =
                                formatGetClusterAnalysisUrl(clusterId);

                              api.get(url).then((res) => {
                                const data = res.data;
                                setClusterAnalysis(data);
                                setIndex(1);
                                setActiveClusterIdx(row.cells[0].value);
                              });
                            }}
                          >
                            {parseInt(cell.value) ? ">" : ""}
                          </td>
                        );
                      } else if (cell.column.id === "isCluster") {
                        return (
                          <td key={j} {...cell.getCellProps()}>
                            {parseInt(cell.value) ? "Cluster" : "Plan"}
                          </td>
                        );
                      }
                      return (
                        <td key={j} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}

export function TableWrapper({
  setIndex,
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  selectedEnsemble,
  selectedDistanceMeasure,
  activeClusterIdx,
  setActiveClusterIdx,
  clusterSetAnalysis,
  setClusterAnalysis,
  pageSize,
  setIsLoading,
}) {
  const columns = useMemo(
    () => [
      {
        Header: "Cluster",
        columns: [
          {
            Header: "No.",
            accessor: "clusterId",
          },
          {
            Header: "Size",
            accessor: "numOfPlans",
          },
        ],
      },
      {
        Header: "Avg. Split",
        columns: [
          {
            Header: "Rep",
            accessor: "avgRepublicanSplit",
          },
          {
            Header: "Dem",
            accessor: "avgDemocraticSplit",
          },
        ],
      },
      {
        Header: "Avg. District Measure",
        columns: [
          {
            Header: "Asian",
            accessor: "avgNumOfAsianOpps",
          },
          {
            Header: "A-A",
            accessor: "avgNumOfAAOpps",
          },
          {
            Header: "Hispanic",
            accessor: "avgNumOfHispanicOpps",
          },
          {
            Header: "MajMin",
            accessor: "avgNumOfMajMinDistricts",
          },
          {
            Header: "Compet.",
            accessor: "avgNumOfCompetitiveDistricts",
          },
        ],
      },
      {
        Header: "Action",
        columns: [
          {
            Header: "Map",
            accessor: "showMap",
          },
        ],
      },
      {
        Header: "Action",
        columns: [
          {
            Header: "Detail",
            accessor: "gotoDetail",
          },
        ],
      },
    ],
    []
  );

  const tableData = useMemo(() => {
    let arr = [];

    if (!clusterSetAnalysis) {
      return arr;
    }

    Array.from(clusterSetAnalysis).forEach((cluster) => {
      arr.push({
        clusterId: parseClusterId(cluster["name"]),
        ...cluster,
        showMap: 1,
        gotoDetail: 1,
      });
    });
    return arr;
  }, [clusterSetAnalysis]);

  if (!clusterSetAnalysis) {
    return <div></div>;
  }

  return (
    <Styles>
      <TableExample
        columns={columns}
        data={tableData}
        setIndex={setIndex}
        newPageSize={pageSize}
        displayedPlans={displayedPlans}
        setDisplayedPlans={setDisplayedPlans}
        selectedState={selectedState}
        selectedEnsemble={selectedEnsemble}
        selectedDistanceMeasure={selectedDistanceMeasure}
        activeClusterIdx={activeClusterIdx}
        setActiveClusterIdx={setActiveClusterIdx}
        setClusterAnalysis={setClusterAnalysis}
        setIsLoading={setIsLoading}
      />
    </Styles>
  );
}

export function TableWrapperPlan({
  setIndex,
  displayedPlans,
  setDisplayedPlans,
  selectedState,
  selectedEnsemble,
  selectedDistanceMeasure,
  activeClusterIdx,
  setActiveClusterIdx,
  clusterAnalysis,
  pageSize,
  setIsLoading,
}) {
  /*
    TODO:
    Change column field. for cluster and plan summary.
  */

  if (!clusterAnalysis) {
    return <div></div>;
  }

  const tableData = [];

  Array.from(clusterAnalysis).forEach((plan) => {
    tableData.push({
      planId: parsePlanId(plan["name"]),
      ...plan,
      democraticSplit: plan["democraticSplit"].length,
      republicanSplit: plan["republicanSplit"].length,
      showMap: plan["availability"] ? 1 : 0,
      gotoDetail: 0,
    });
  });

  console.log("tableData");
  console.log(tableData);

  //sort tableData by planId
  tableData.sort((a, b) => {
    return a.planId - b.planId;
  });

  const columns = [
    {
      Header: "Plan",
      columns: [
        {
          Header: "No.",
          accessor: "planId",
        },
      ],
    },
    {
      Header: "Split",
      columns: [
        {
          Header: "Rep",
          accessor: "republicanSplit",
        },
        {
          Header: "Dem",
          accessor: "democraticSplit",
        },
      ],
    },
    {
      Header: "District Measure",
      columns: [
        {
          Header: "Asian",
          accessor: "numOfAsianOpp",
        },
        {
          Header: "A-A",
          accessor: "numOfAAOpp",
        },
        {
          Header: "Hispanic",
          accessor: "numOfHispanicOpp",
        },
        {
          Header: "MajMin",
          accessor: "numOfMajMinDistricts",
        },
        {
          Header: "Compet.",
          accessor: "numOfCompetitiveDistricts",
        },
      ],
    },
    {
      Header: "Action",
      columns: [
        {
          Header: "Map",
          accessor: "showMap",
        },
      ],
    },
  ];

  return (
    <Styles>
      <TableExamplePlan
        columns={columns}
        data={tableData}
        setIndex={setIndex}
        displayedPlans={displayedPlans}
        setDisplayedPlans={setDisplayedPlans}
        selectedState={selectedState}
        selectedEnsemble={selectedEnsemble}
        selectedDistanceMeasure={selectedDistanceMeasure}
        activeClusterIdx={activeClusterIdx}
        setActiveClusterIdx={setActiveClusterIdx}
        newPageSize={pageSize}
        setIsLoading={setIsLoading}
      />
    </Styles>
  );
}

export function TableWrapperClusterAndPlan({ setIndex }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Plan",
        columns: [
          {
            Header: "Type",
            accessor: "isCluster",
          },
        ],
      },
      {
        Header: "Political Index",
        columns: [
          {
            Header: "Margin",
            accessor: "split",
          },
          {
            Header: "Dem. %",
            accessor: "dem",
          },
          {
            Header: "Rep. %",
            accessor: "rep",
          },
          {
            Header: "Dem. Seats",
            accessor: "seatDem",
          },
          {
            Header: "Rep. Seats",
            accessor: "seatRep",
          },
        ],
      },
      {
        Header: "Demographic Index",
        columns: [
          {
            Header: "Asian",
            accessor: "asian",
          },
          {
            Header: "A-An",
            accessor: "african",
          },
          {
            Header: "Hisp.",
            accessor: "hispanic",
          },
          {
            Header: "White",
            accessor: "white",
          },
          {
            Header: "Other",
            accessor: "other",
          },
          {
            Header: "Maj-Min",
            accessor: "majminRatio",
          },
        ],
      },
      {
        Header: "Action",
        columns: [
          {
            Header: "Map",
            accessor: "showMap",
          },
        ],
      },
      {
        Header: "Action",
        columns: [
          {
            Header: "Detail",
            accessor: "gotoDetail",
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeDataClusterAndPlan(10050), []);

  return (
    <Styles>
      <TableExample
        columns={columns}
        data={data}
        setIndex={setIndex}
        newPageSize={20}
      />
    </Styles>
  );
}
