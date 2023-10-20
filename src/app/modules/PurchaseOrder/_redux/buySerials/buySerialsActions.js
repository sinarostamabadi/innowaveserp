
import * as requestFromServer from "./buySerialsCrud";
import { buySerialsSlice, callTypes } from "./buySerialsSlice";
const { actions } = buySerialsSlice;
export const fetchBuySerials = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBuySerials(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.buySerialsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find buySerials";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBuySerial = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.buySerialFetched({ buySerialForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBuySerialById(id)  
    .then((response) => {
      const buySerial = response.data;
      dispatch(actions.buySerialFetched({ buySerialForEdit: buySerial }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find buySerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuySerial = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBuySerial(id)  
    .then((response) => {
      dispatch(actions.buySerialDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete buySerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBuySerial = (buySerialForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBuySerial(buySerialForCreation)  
    .then((response) => {
      const buySerial = response.data;
      dispatch(actions.buySerialCreated(buySerial));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create buySerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuySerial = (buySerial) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBuySerial(buySerial)  
    .then((response) => {
      dispatch(actions.buySerialUpdated({ buySerial }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update buySerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuySerialsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBuySerials(ids, status)  
    .then(() => {
      dispatch(actions.buySerialsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update buySerials status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuySerials = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBuySerials(ids)  
    .then(() => {
      dispatch(actions.buySerialsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete buySerials";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 