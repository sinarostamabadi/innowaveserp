
import * as requestFromServer from "./billiardReservesCrud";
import { billiardReservesSlice, callTypes } from "./billiardReservesSlice";
const { actions } = billiardReservesSlice;
export const fetchBilliardReserves = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBilliardReserves(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.billiardReservesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find billiardReserves";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBilliardReserve = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.billiardReserveFetched({ billiardReserveForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBilliardReserveById(id)  
    .then((response) => {
      const billiardReserve = response.data;
      dispatch(actions.billiardReserveFetched({ billiardReserveForEdit: billiardReserve }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find billiardReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardReserve = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBilliardReserve(id)  
    .then((response) => {
      dispatch(actions.billiardReserveDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete billiardReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBilliardReserve = (billiardReserveForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBilliardReserve(billiardReserveForCreation)  
    .then((response) => {
      const billiardReserve = response.data;
      dispatch(actions.billiardReserveCreated(billiardReserve));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create billiardReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBilliardReserve = (billiardReserve) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBilliardReserve(billiardReserve)  
    .then((response) => {
      dispatch(actions.billiardReserveUpdated({ billiardReserve }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update billiardReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBilliardReservesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBilliardReserves(ids, status)  
    .then(() => {
      dispatch(actions.billiardReservesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update billiardReserves status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardReserves = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBilliardReserves(ids)  
    .then(() => {
      dispatch(actions.billiardReservesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete billiardReserves";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 