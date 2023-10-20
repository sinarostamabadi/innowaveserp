
import * as requestFromServer from "./billiardReservePricesCrud";
import { billiardReservePricesSlice, callTypes } from "./billiardReservePricesSlice";
const { actions } = billiardReservePricesSlice;
export const fetchBilliardReservePrices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBilliardReservePrices(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.billiardReservePricesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find billiardReservePrices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBilliardReservePrice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.billiardReservePriceFetched({ billiardReservePriceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBilliardReservePriceById(id)  
    .then((response) => {
      const billiardReservePrice = response.data;
      dispatch(actions.billiardReservePriceFetched({ billiardReservePriceForEdit: billiardReservePrice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find billiardReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardReservePrice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBilliardReservePrice(id)  
    .then((response) => {
      dispatch(actions.billiardReservePriceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete billiardReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBilliardReservePrice = (billiardReservePriceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBilliardReservePrice(billiardReservePriceForCreation)  
    .then((response) => {
      const billiardReservePrice = response.data;
      dispatch(actions.billiardReservePriceCreated(billiardReservePrice));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create billiardReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBilliardReservePrice = (billiardReservePrice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBilliardReservePrice(billiardReservePrice)  
    .then((response) => {
      dispatch(actions.billiardReservePriceUpdated({ billiardReservePrice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update billiardReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBilliardReservePricesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBilliardReservePrices(ids, status)  
    .then(() => {
      dispatch(actions.billiardReservePricesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update billiardReservePrices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardReservePrices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBilliardReservePrices(ids)  
    .then(() => {
      dispatch(actions.billiardReservePricesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete billiardReservePrices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 