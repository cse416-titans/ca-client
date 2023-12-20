import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

import { Row, Col } from "react-bootstrap";
import { toFixed1, toFixed2 } from "../../utils/StringFormat";

export function DMComparison({ distanceMeasureComparison }) {
  const distances = Object.keys(distanceMeasureComparison).map((key) => {
    return {
      name: key,
      planDistanceArr: distanceMeasureComparison[key]["planDistances"],
      clusterDistanceArr: distanceMeasureComparison[key]["clusterDistances"],
      clusterSizeArr: distanceMeasureComparison[key]["clusterSizes"],
    };
  });

  return (
    <>
      <Row>
        <h4>Plan-To-Plan Distance Within a Cluster</h4>
        {distances
          ? Object.keys(distances).map((key) => {
              const planDistanceArr = [];

              for (
                let i = 0;
                i < distances[key]["planDistanceArr"].length;
                i++
              ) {
                planDistanceArr.push({
                  name: toFixed2(distances[key]["planDistanceArr"][i]),
                  value: toFixed2(distances[key]["planDistanceArr"][i]),
                });
              }

              console.log("planDistanceArr");
              console.log(planDistanceArr);

              const planDistanceFreq = {};

              for (let i = 0; i < planDistanceArr.length; i++) {
                if (!planDistanceFreq[planDistanceArr[i]["name"]]) {
                  planDistanceFreq[planDistanceArr[i]["name"]] = 0;
                }
                planDistanceFreq[planDistanceArr[i]["name"]] += 1;
              }

              console.log("planDistanceFreq");
              console.log(planDistanceFreq);

              const planDistanceFreqArr = Object.keys(planDistanceFreq).map(
                (key) => {
                  return {
                    name: key,
                    value: planDistanceFreq[key],
                  };
                }
              );

              //sort by name
              planDistanceFreqArr.sort((a, b) => {
                return a.name - b.name;
              });

              console.log("planDistanceFreqArr");
              console.log(planDistanceFreqArr);

              //plot area chart with fixed x domain [0,1] and fixed y domain

              return (
                <Col key={key}>
                  <AreaChart
                    width={300}
                    height={200}
                    data={planDistanceFreqArr}
                    margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={"name"} />
                    <YAxis domain={[0, 500]}>
                      <Label angle={270} dx={-20}>
                        {key === "0"
                          ? "Hamming"
                          : key === "1"
                          ? "Entropy"
                          : "Opt. Transp."}
                      </Label>
                    </YAxis>
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </Col>
              );
            })
          : null}
      </Row>
      <Row>
        <h4>Cluster-To-Cluster Distance</h4>
        {distances
          ? Object.keys(distances).map((key) => {
              const clusterDistanceArr = [];

              for (
                let i = 0;
                i < distances[key]["clusterDistanceArr"].length;
                i++
              ) {
                clusterDistanceArr.push({
                  name: toFixed2(distances[key]["clusterDistanceArr"][i]),
                  value: toFixed2(distances[key]["clusterDistanceArr"][i]),
                });
              }

              console.log("clusterDistanceArr");
              console.log(clusterDistanceArr);

              const clusterDistanceFreq = {};

              for (let i = 0; i < clusterDistanceArr.length; i++) {
                if (!clusterDistanceFreq[clusterDistanceArr[i]["name"]]) {
                  clusterDistanceFreq[clusterDistanceArr[i]["name"]] = 0;
                }
                clusterDistanceFreq[clusterDistanceArr[i]["name"]] += 1;
              }

              console.log("clusterDistanceFreq");
              console.log(clusterDistanceFreq);

              const clusterDistanceFreqArr = Object.keys(
                clusterDistanceFreq
              ).map((key) => {
                return {
                  name: key,
                  value: clusterDistanceFreq[key],
                };
              });

              //sort by name
              clusterDistanceFreqArr.sort((a, b) => {
                return a.name - b.name;
              });

              console.log("clusterDistanceFreqArr");
              console.log(clusterDistanceFreqArr);

              //plot area chart with fixed x domain [0,1] and fixed y domain

              return (
                <Col key={key}>
                  <AreaChart
                    width={200}
                    height={100}
                    data={clusterDistanceFreqArr}
                    margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 1]}>
                      <Label angle={270} dx={-20}>
                        {key === "0"
                          ? "Hamming"
                          : key === "1"
                          ? "Entropy"
                          : "Opt. Transp."}
                      </Label>
                    </YAxis>
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </Col>
              );
            })
          : null}
      </Row>
      <Row>
        <h4>Cluster Size</h4>
        {distances
          ? Object.keys(distances).map((key) => {
              const clusterSizeArr = [];

              for (
                let i = 0;
                i < distances[key]["clusterSizeArr"].length;
                i++
              ) {
                clusterSizeArr.push({
                  name: toFixed1(distances[key]["clusterSizeArr"][i]),
                  value: toFixed1(distances[key]["clusterSizeArr"][i]),
                });
              }

              console.log("clusterSizeArr");
              console.log(clusterSizeArr);

              const clusterSizeFreq = {};

              for (let i = 0; i < clusterSizeArr.length; i++) {
                if (!clusterSizeFreq[clusterSizeArr[i]["name"]]) {
                  clusterSizeFreq[clusterSizeArr[i]["name"]] = 0;
                }
                clusterSizeFreq[clusterSizeArr[i]["name"]] += 1;
              }

              console.log("clusterSizeFreq");
              console.log(clusterSizeFreq);

              const clusterSizeFreqArr = Object.keys(clusterSizeFreq).map(
                (key) => {
                  return {
                    name: key,
                    value: clusterSizeFreq[key],
                  };
                }
              );

              //sort by name
              clusterSizeFreqArr.sort((a, b) => {
                return a.name - b.name;
              });

              console.log("clusterSizeFreqArr");
              console.log(clusterSizeFreqArr);

              //plot area chart with fixed x domain [0,1] and fixed y domain

              return (
                <Col key={key}>
                  <AreaChart
                    width={200}
                    height={100}
                    data={clusterSizeFreqArr}
                    margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 10]}>
                      <Label angle={270} dx={-20}>
                        {key === "0"
                          ? "Hamming"
                          : key === "1"
                          ? "Entropy"
                          : "Opt. Transp."}
                      </Label>
                    </YAxis>
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </Col>
              );
            })
          : null}
      </Row>
    </>
  );
}
