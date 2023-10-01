import React from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";
import { Button, Container, Row, Col } from "react-bootstrap";

import makeData from "../../assets/makeData";

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

function TableExample({ columns, data }) {
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
      initialState: { pageIndex: 2 },
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
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th {...column.getHeaderProps()}>
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
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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

export default function TableWrapper() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Cluster",
        columns: [
          {
            Header: "No.",
            accessor: "firstName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(50), []);

  return (
    <Styles>
      <TableExample columns={columns} data={data} />
    </Styles>
  );
}
