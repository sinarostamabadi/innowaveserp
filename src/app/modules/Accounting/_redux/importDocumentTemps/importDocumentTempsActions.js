
import * as requestFromServer from "./importDocumentTempsCrud";
import { importDocumentTempsSlice, callTypes } from "./importDocumentTempsSlice";
const { actions } = importDocumentTempsSlice;
export const fetchImportDocumentTemps = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findImportDocumentTemps(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.importDocumentTempsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find importDocumentTemps";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchImportDocumentTemp = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.importDocumentTempFetched({ importDocumentTempForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getImportDocumentTempById(id)  
    .then((response) => {
      const importDocumentTemp = response.data;
      dispatch(actions.importDocumentTempFetched({ importDocumentTempForEdit: importDocumentTemp }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find importDocumentTemp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteImportDocumentTemp = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteImportDocumentTemp(id)  
    .then((response) => {
      dispatch(actions.importDocumentTempDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete importDocumentTemp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createImportDocumentTemp = (importDocumentTempForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createImportDocumentTemp(importDocumentTempForCreation)  
    .then((response) => {
      const importDocumentTemp = response.data;
      dispatch(actions.importDocumentTempCreated(importDocumentTemp));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create importDocumentTemp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateImportDocumentTemp = (importDocumentTemp) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateImportDocumentTemp(importDocumentTemp)  
    .then((response) => {
      dispatch(actions.importDocumentTempUpdated({ importDocumentTemp }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update importDocumentTemp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateImportDocumentTempsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForImportDocumentTemps(ids, status)  
    .then(() => {
      dispatch(actions.importDocumentTempsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update importDocumentTemps status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteImportDocumentTemps = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteImportDocumentTemps(ids)  
    .then(() => {
      dispatch(actions.importDocumentTempsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete importDocumentTemps";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 