
import * as requestFromServer from "./sellDocumentDetailSerialsCrud";
import { sellDocumentDetailSerialsSlice, callTypes } from "./sellDocumentDetailSerialsSlice";
const { actions } = sellDocumentDetailSerialsSlice;
export const fetchSellDocumentDetailSerials = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellDocumentDetailSerials(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellDocumentDetailSerialsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocumentDetailSerials";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellDocumentDetailSerial = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellDocumentDetailSerialFetched({ sellDocumentDetailSerialForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellDocumentDetailSerialById(id)  
    .then((response) => {
      const sellDocumentDetailSerial = response.data;
      dispatch(actions.sellDocumentDetailSerialFetched({ sellDocumentDetailSerialForEdit: sellDocumentDetailSerial }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocumentDetailSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocumentDetailSerial = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocumentDetailSerial(id)  
    .then((response) => {
      dispatch(actions.sellDocumentDetailSerialDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocumentDetailSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellDocumentDetailSerial = (sellDocumentDetailSerialForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellDocumentDetailSerial(sellDocumentDetailSerialForCreation)  
    .then((response) => {
      const sellDocumentDetailSerial = response.data;
      dispatch(actions.sellDocumentDetailSerialCreated(sellDocumentDetailSerial));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellDocumentDetailSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocumentDetailSerial = (sellDocumentDetailSerial) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellDocumentDetailSerial(sellDocumentDetailSerial)  
    .then((response) => {
      dispatch(actions.sellDocumentDetailSerialUpdated({ sellDocumentDetailSerial }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocumentDetailSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocumentDetailSerialsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellDocumentDetailSerials(ids, status)  
    .then(() => {
      dispatch(actions.sellDocumentDetailSerialsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocumentDetailSerials status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocumentDetailSerials = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocumentDetailSerials(ids)  
    .then(() => {
      dispatch(actions.sellDocumentDetailSerialsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocumentDetailSerials";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};