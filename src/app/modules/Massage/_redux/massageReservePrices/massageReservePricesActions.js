
import * as requestFromServer from "./massageReservePricesCrud";
import { massageReservePricesSlice, callTypes } from "./massageReservePricesSlice";
const { actions } = massageReservePricesSlice;
export const fetchMassageReservePrices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findMassageReservePrices(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.massageReservePricesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find massageReservePrices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMassageReservePrice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.massageReservePriceFetched({ massageReservePriceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getMassageReservePriceById(id)  
    .then((response) => {
      const massageReservePrice = response.data;
      dispatch(actions.massageReservePriceFetched({ massageReservePriceForEdit: massageReservePrice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find massageReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageReservePrice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteMassageReservePrice(id)  
    .then((response) => {
      dispatch(actions.massageReservePriceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete massageReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMassageReservePrice = (massageReservePriceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createMassageReservePrice(massageReservePriceForCreation)  
    .then((response) => {
      const massageReservePrice = response.data;
      dispatch(actions.massageReservePriceCreated(massageReservePrice));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create massageReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMassageReservePrice = (massageReservePrice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateMassageReservePrice(massageReservePrice)  
    .then((response) => {
      dispatch(actions.massageReservePriceUpdated({ massageReservePrice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update massageReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMassageReservePricesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForMassageReservePrices(ids, status)  
    .then(() => {
      dispatch(actions.massageReservePricesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update massageReservePrices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageReservePrices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteMassageReservePrices(ids)  
    .then(() => {
      dispatch(actions.massageReservePricesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete massageReservePrices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 