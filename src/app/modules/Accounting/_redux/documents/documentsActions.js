import * as requestFromServer from "./documentsCrud";
import { documentsSlice, callTypes } from "./documentsSlice";

const { actions } = documentsSlice;
export const fetchDocuments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findDocuments(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.documentsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find documents";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchDocument = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.documentFetched({ documentForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getDocumentById(id)  
    .then((response) => {
      const document = response.data;
      dispatch(actions.documentFetched({ documentForEdit: document }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find document";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDocument = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteDocument(id)  
    .then((response) => {
      dispatch(actions.documentDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete document";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createDocument = (documentForCreation, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createDocument(documentForCreation)  
    .then((response) => {
      const document = response.data;
      fnCallback(document);

      dispatch(actions.documentCreated(document));

      return document;
    })  
    .catch((error) => {
      error.clientMessage = "Can't create document";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDocument = (id, document, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateDocument(id, document)  
    .then((response) => {
      fnCallback(response);

      dispatch(actions.documentUpdated({ document }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update document";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDocumentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForDocuments(ids, status)  
    .then(() => {
      dispatch(actions.documentsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update documents status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDocuments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteDocuments(ids)  
    .then(() => {
      dispatch(actions.documentsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete documents";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 
