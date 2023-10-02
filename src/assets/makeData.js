import { randomColorArr } from "./testData";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newCluster = (i) => {
  const split = Number.parseFloat(-50 + Math.random() * 50).toFixed(2);
  const dem = Number.parseFloat(50 - split).toFixed(2);
  const rep = parseFloat(100 - dem).toFixed(2);
  const seatDem = Number.parseInt(Math.random() * 10);
  const seatRep = Number.parseInt(10 - seatDem);
  const asian = Number.parseFloat(Math.random() * 1).toFixed(2);
  const african = Number.parseFloat(Math.random() * 1).toFixed(2);
  const hispanic = Number.parseFloat(Math.random() * 1).toFixed(2);
  const other = Number.parseFloat(Math.random() * 1).toFixed(2);
  const white = Number.parseFloat(
    1 - parseFloat(asian + african + hispanic + other)
  ).toFixed(2);
  const majminRatio = Number.parseFloat(
    white - parseFloat(asian + african + hispanic + other)
  ).toFixed(2);

  const showMap = Math.random() * 1 > 0 ? 1 : 0;
  const gotoDetail = 1;

  return {
    color: randomColorArr[i],
    firstName: i,
    split,
    dem,
    rep,
    seatDem,
    seatRep,
    asian,
    african,
    hispanic,
    white,
    other,
    majminRatio,
    showMap,
    gotoDetail,
  };
};

const newPlan = (i) => {
  const split = Number.parseFloat(-50 + Math.random() * 50).toFixed(2);
  const dem = Number.parseFloat(50 - split).toFixed(2);
  const rep = parseFloat(100 - dem).toFixed(2);
  const seatDem = Number.parseInt(Math.random() * 10);
  const seatRep = Number.parseInt(10 - seatDem);
  const asian = Number.parseFloat(Math.random() * 1).toFixed(2);
  const african = Number.parseFloat(Math.random() * 1).toFixed(2);
  const hispanic = Number.parseFloat(Math.random() * 1).toFixed(2);
  const other = Number.parseFloat(Math.random() * 1).toFixed(2);
  const white = Number.parseFloat(
    1 - parseFloat(asian + african + hispanic + other)
  ).toFixed(2);
  const majminRatio = Number.parseFloat(
    white - parseFloat(asian + african + hispanic + other)
  ).toFixed(2);

  const showMap = Math.random() * 1 > 0.5 ? 1 : 0;
  const gotoDetail = 0;

  return {
    color: randomColorArr[i],
    firstName: i,
    split,
    dem,
    rep,
    seatDem,
    seatRep,
    asian,
    african,
    hispanic,
    white,
    other,
    majminRatio,
    showMap,
    gotoDetail,
  };
};

const newClusterAndPlan = (i) => {
  const split = Number.parseFloat(-50 + Math.random() * 50).toFixed(2);
  const dem = Number.parseFloat(50 - split).toFixed(2);
  const rep = parseFloat(100 - dem).toFixed(2);
  const seatDem = Number.parseInt(Math.random() * 10);
  const seatRep = Number.parseInt(10 - seatDem);
  const asian = Number.parseFloat(Math.random() * 1).toFixed(2);
  const african = Number.parseFloat(Math.random() * 1).toFixed(2);
  const hispanic = Number.parseFloat(Math.random() * 1).toFixed(2);
  const other = Number.parseFloat(Math.random() * 1).toFixed(2);
  const white = Number.parseFloat(
    1 - parseFloat(asian + african + hispanic + other)
  ).toFixed(2);
  const majminRatio = Number.parseFloat(
    white - parseFloat(asian + african + hispanic + other)
  ).toFixed(2);

  const isCluster = Math.random() * 1 > 0.3 ? 1 : 0;
  const showMap = isCluster ? 1 : Math.random() * 1 > 0.5 ? 1 : 0;
  const gotoDetail = isCluster ? 1 : 0;

  return {
    color: randomColorArr[i],
    firstName: i,
    split,
    dem,
    rep,
    seatDem,
    seatRep,
    asian,
    african,
    hispanic,
    white,
    other,
    majminRatio,
    showMap,
    gotoDetail,
    isCluster,
  };
};

export function makeData(...lens) {
  let i = 0;
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newCluster(++i),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export function makeDataPlan(...lens) {
  let i = 0;
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPlan(++i),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export function makeDataClusterAndPlan(...lens) {
  let i = 0;
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newClusterAndPlan(++i),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export const exampleEnsembleArr = Array.from({ length: 10 }, () => 0);
