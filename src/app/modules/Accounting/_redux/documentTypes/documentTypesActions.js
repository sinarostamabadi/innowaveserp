
import * as requestFromServer from "./documentTypesCrud";
import { documentTypesSlice, callTypes } from "./documentTypesSlice";
const { actions } = documentTypesSlice;
export const fetchDocumentTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findDocumentTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.documentTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find documentTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchDocumentType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.documentTypeFetched({ documentTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getDocumentTypeById(id)  
    .then((response) => {
      const documentType = response.data;
      dispatch(actions.documentTypeFetched({ documentTypeForEdit: documentType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find documentType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDocumentType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteDocumentType(id)  
    .then((response) => {
      dispatch(actions.documentTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete documentType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createDocumentType = (documentTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createDocumentType(documentTypeForCreation)  
    .then((response) => {
      const documentType = response.data;
      dispatch(actions.documentTypeCreated(documentType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create documentType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDocumentType = (id, documentType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateDocumentType(id, documentType)  
    .then((response) => {
      dispatch(actions.documentTypeUpdated({ documentType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update documentType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDocumentTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForDocumentTypes(ids, status)  
    .then(() => {
      dispatch(actions.documentTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update documentTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDocumentTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteDocumentTypes(ids)  
    .then(() => {
      dispatch(actions.documentTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete documentTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};