
import * as requestFromServer from "./futsalReservePricesCrud";
import { futsalReservePricesSlice, callTypes } from "./futsalReservePricesSlice";
const { actions } = futsalReservePricesSlice;
export const fetchFutsalReservePrices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findFutsalReservePrices(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.futsalReservePricesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalReservePrices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchFutsalReservePrice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.futsalReservePriceFetched({ futsalReservePriceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getFutsalReservePriceById(id)  
    .then((response) => {
      const futsalReservePrice = response.data;
      dispatch(actions.futsalReservePriceFetched({ futsalReservePriceForEdit: futsalReservePrice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalReservePrice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalReservePrice(id)  
    .then((response) => {
      dispatch(actions.futsalReservePriceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createFutsalReservePrice = (futsalReservePriceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createFutsalReservePrice(futsalReservePriceForCreation)  
    .then((response) => {
      const futsalReservePrice = response.data;
      dispatch(actions.futsalReservePriceCreated(futsalReservePrice));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create futsalReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalReservePrice = (futsalReservePrice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateFutsalReservePrice(futsalReservePrice)  
    .then((response) => {
      dispatch(actions.futsalReservePriceUpdated({ futsalReservePrice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalReservePricesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForFutsalReservePrices(ids, status)  
    .then(() => {
      dispatch(actions.futsalReservePricesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalReservePrices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalReservePrices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalReservePrices(ids)  
    .then(() => {
      dispatch(actions.futsalReservePricesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalReservePrices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 