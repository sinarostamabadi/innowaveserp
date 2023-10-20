
import * as requestFromServer from "./costCentersCrud";
import { costCentersSlice, callTypes } from "./costCentersSlice";
const { actions } = costCentersSlice;
export const fetchCostCenters = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCostCenters(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.costCentersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find costCenters";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCostCenter = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.costCenterFetched({ costCenterForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCostCenterById(id)  
    .then((response) => {
      const costCenter = response.data;
      dispatch(actions.costCenterFetched({ costCenterForEdit: costCenter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find costCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCostCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCostCenter(id)  
    .then((response) => {
      dispatch(actions.costCenterDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete costCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCostCenter = (costCenterForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCostCenter(costCenterForCreation)  
    .then((response) => {
      const costCenter = response.data;
      dispatch(actions.costCenterCreated(costCenter));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create costCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCostCenter = (id, costCenter) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCostCenter(id, costCenter)  
    .then((response) => {
      dispatch(actions.costCenterUpdated({ costCenter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update costCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCostCentersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCostCenters(ids, status)  
    .then(() => {
      dispatch(actions.costCentersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update costCenters status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCostCenters = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCostCenters(ids)  
    .then(() => {
      dispatch(actions.costCentersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete costCenters";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};