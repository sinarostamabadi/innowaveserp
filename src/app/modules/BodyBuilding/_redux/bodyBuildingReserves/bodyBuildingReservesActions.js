
import * as requestFromServer from "./bodyBuildingReservesCrud";
import { bodyBuildingReservesSlice, callTypes } from "./bodyBuildingReservesSlice";
const { actions } = bodyBuildingReservesSlice;
export const fetchBodyBuildingReserves = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBodyBuildingReserves(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bodyBuildingReservesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingReserves";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBodyBuildingReserve = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bodyBuildingReserveFetched({ bodyBuildingReserveForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBodyBuildingReserveById(id)  
    .then((response) => {
      const bodyBuildingReserve = response.data;
      dispatch(actions.bodyBuildingReserveFetched({ bodyBuildingReserveForEdit: bodyBuildingReserve }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingReserve = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBodyBuildingReserve(id)  
    .then((response) => {
      dispatch(actions.bodyBuildingReserveDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBodyBuildingReserve = (bodyBuildingReserveForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBodyBuildingReserve(bodyBuildingReserveForCreation)  
    .then((response) => {
      const bodyBuildingReserve = response.data;
      dispatch(actions.bodyBuildingReserveCreated(bodyBuildingReserve));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create bodyBuildingReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBodyBuildingReserve = (bodyBuildingReserve) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBodyBuildingReserve(bodyBuildingReserve)  
    .then((response) => {
      dispatch(actions.bodyBuildingReserveUpdated({ bodyBuildingReserve }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bodyBuildingReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBodyBuildingReservesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBodyBuildingReserves(ids, status)  
    .then(() => {
      dispatch(actions.bodyBuildingReservesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bodyBuildingReserves status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingReserves = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBodyBuildingReserves(ids)  
    .then(() => {
      dispatch(actions.bodyBuildingReservesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingReserves";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 