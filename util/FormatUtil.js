import { de } from "@faker-js/faker";

const URL = `http://localhost:8080`;

export const formatEnsembleId = (stateId, ensembleId) => {
  return `${stateId}:ensemble-${ensembleId}`;
};

export const formatClusterSetId = (stateId, ensembleId, clusterSetId) => {
  return `${stateId}:ensemble-${ensembleId}:clusterSet-${clusterSetId}`;
};

export const formatClusterId = (
  stateId,
  ensembleId,
  clusterSetId,
  clusterId
) => {
  return `${stateId}:ensemble-${ensembleId}:clusterSet-${clusterSetId}:cluster-${clusterId}`;
};

export const formatPlanId = (stateId, ensembleId, planId) => {
  return `${stateId}:ensemble-${ensembleId}:plan-${planId}`;
};

export const formatGetCurrentEnactedPlanUrl = (planId) => {
  return `${URL}/planSummary?planId=${planId}`;
};

export const formatGetClusterSetAnalysisUrl = (
  ensembleId,
  distanceMeasureId
) => {
  return `${URL}/analysis/clusterSet?ensembleId=${ensembleId}&DMId=clusterSet-${distanceMeasureId}`;
};

export const formatGetClusterAnalysisUrl = (clusterId) => {
  return `${URL}/analysis/cluster?clusterId=${clusterId}`;
};

export const formatGetClusterAvgPlanBoundaryUrl = (clusterId) => {
  return `${URL}/clusterAvgPlan?clusterId=${clusterId}`;
};

export const formatGetPlanBoundaryUrl = (planId) => {
  return `${URL}/plan?planId=${planId}`;
};

export const formatGetStateSummaryUrl = (stateId) => {
  return `${URL}/stateSummary?stateId=${stateId}`;
};

export const formatGetStateAnalysisUrl = (stateId) => {
  return `${URL}/analysis/state?stateId=${stateId}`;
};

export const formatGetEnsembleAnalysisUrl = (ensembleId) => {
  return `${URL}/analysis/ensemble?ensembleId=${ensembleId}`;
};

export const formatGetAssociationAnalysisUrl = (stateId) => {
  return `${URL}/analysis/association?stateId=${stateId}`;
};

export const formatGetDistanceMeasureComparisonUrl = (ensembleId) => {
  return `${URL}/analysis/DMcomparison?ensembleId=${ensembleId}`;
};

export const parseClusterId = (clusterName) => {
  const clusterId = clusterName.split("-")[1];
  return parseInt(clusterId);
};

export const parsePlanId = (planName) => {
  const planId = planName.split("-")[1];
  return parseInt(planId);
};

export const makeDistanceMeasureName = (i) => {
  switch (i) {
    case 0:
      return "Hamming";

    case 1:
      return "Entropy";

    case 2:
      return "Optimal Transport";
  }
};

export const formatColorFilterTitle = (colorFilter) => {
  switch (colorFilter) {
    case "voteSplit":
      return "Vote Split";
    case "avgNumOfAAOpps":
      return "Avg. AA Opps";
    case "avgNumOfAsianOpps":
      return "Avg. Asian Opps";
    case "avgNumOfWhiteOpps":
      return "Avg. White Opps";
    case "avgNumOfHispanicOpps":
      return "Avg. Hispanic Opps";
    default:
      return "No Filter";
  }
};

export const formatAxisTitle = (axis) => {
  switch (axis) {
    case "default":
      return "Geometric Difference";
    case "avgDemocraticSplit":
      return "Democratic Vote Split";
    case "avgRepublicanSplit":
      return "Republican Vote Split";
    case "avgNumOfAAOpps":
      return "Avg. AA Opps";
    case "avgNumOfAsianOpps":
      return "Avg. Asian Opps";
    case "avgNumOfWhiteOpps":
      return "Avg. White Opps";
    case "avgNumOfHispanicOpps":
      return "Avg. Hispanic Opps";
    default:
      return "No Filter";
  }
};

export const getClusterId = (clusterName) => {
  return clusterName.split("-")[1];
};
