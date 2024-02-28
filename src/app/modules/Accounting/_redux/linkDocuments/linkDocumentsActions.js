import * as requestFromServer from "./linkDocumentsCrud";
import { linkDocumentsSlice, callTypes } from "./linkDocumentsSlice";
const { actions } = linkDocumentsSlice;
export const fetchLinkDocuments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findLinkDocuments(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.linkDocumentsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find linkDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchLinkDocument = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.linkDocumentFetched({ linkDocumentForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLinkDocumentById(id)
    .then((response) => {
      const linkDocument = response.data;
      dispatch(
        actions.linkDocumentFetched({ linkDocumentForEdit: linkDocument })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find linkDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLinkDocument = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLinkDocument(id)
    .then((response) => {
      dispatch(actions.linkDocumentDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete linkDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createLinkDocument = (linkDocumentForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createLinkDocument(linkDocumentForCreation)
    .then((response) => {
      const linkDocument = response.data;
      dispatch(actions.linkDocumentCreated(linkDocument));
    })
    .catch((error) => {
      error.clientMessage = "Can't create linkDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLinkDocument = (linkDocument) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateLinkDocument(linkDocument)
    .then((response) => {
      dispatch(actions.linkDocumentUpdated({ linkDocument }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update linkDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLinkDocumentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForLinkDocuments(ids, status)
    .then(() => {
      dispatch(actions.linkDocumentsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update linkDocuments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLinkDocuments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLinkDocuments(ids)
    .then(() => {
      dispatch(actions.linkDocumentsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete linkDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
