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

export const formatPlanId = (
  stateId,
  ensembleId,
  clusterSetId,
  clusterId,
  planId
) => {
  return `${stateId}:ensemble-${ensembleId}:clusterSet-${clusterSetId}:cluster-${clusterId}:plan-${planId}`;
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

export const parseClusterId = (clusterName) => {
  const clusterId = clusterName.split("-")[1];
  return parseInt(clusterId);
};

export const parsePlanId = (planName) => {
  const planId = planName.split("-")[1];
  return parseInt(planId);
};
