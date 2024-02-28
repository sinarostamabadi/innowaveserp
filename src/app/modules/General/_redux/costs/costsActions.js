import * as requestFromServer from "./costsCrud";
import { costsSlice, callTypes } from "./costsSlice";
const { actions } = costsSlice;
export const fetchCosts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCosts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.costsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find costs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCost = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.costFetched({ costForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCostById(id)
    .then((response) => {
      const cost = response.data;
      dispatch(actions.costFetched({ costForEdit: cost }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCost = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCost(id)
    .then((response) => {
      dispatch(actions.costDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCost = (costForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCost(costForCreation)
    .then((response) => {
      const cost = response.data;
      dispatch(actions.costCreated(cost));
    })
    .catch((error) => {
      error.clientMessage = "Can't create cost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCost = (id, cost) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCost(id, cost)
    .then((response) => {
      dispatch(actions.costUpdated({ cost }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCostsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCosts(ids, status)
    .then(() => {
      dispatch(actions.costsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update costs status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCosts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCosts(ids)
    .then(() => {
      dispatch(actions.costsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete costs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
