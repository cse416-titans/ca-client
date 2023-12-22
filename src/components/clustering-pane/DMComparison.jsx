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
    </>
  );
}
