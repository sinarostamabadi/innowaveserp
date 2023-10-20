
import * as requestFromServer from "./sellDocumentsCrud";
import { sellDocumentsSlice, callTypes } from "./sellDocumentsSlice";
const { actions } = sellDocumentsSlice;
export const fetchSellDocuments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellDocuments(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellDocumentsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellDocument = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellDocumentFetched({ sellDocumentForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellDocumentById(id)  
    .then((response) => {
      const sellDocument = response.data;
      dispatch(actions.sellDocumentFetched({ sellDocumentForEdit: sellDocument }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocument = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocument(id)  
    .then((response) => {
      dispatch(actions.sellDocumentDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellDocument = (sellDocument, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellDocument(sellDocument)  
    .then((response) => {
      const sellDocument = response.data;
      fnCallback(sellDocument);
      dispatch(actions.sellDocumentCreated(sellDocument));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocument = (id, sellDocument, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellDocument(id, sellDocument)  
    .then((response) => {
      fnCallback(response);
      dispatch(actions.sellDocumentUpdated({ sellDocument }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocumentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellDocuments(ids, status)  
    .then(() => {
      dispatch(actions.sellDocumentsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocuments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocuments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocuments(ids)  
    .then(() => {
      dispatch(actions.sellDocumentsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 