import * as requestFromServer from "./documentRequestsCrud";
import { documentRequestsSlice, callTypes } from "./documentRequestsSlice";
const { actions } = documentRequestsSlice;
export const fetchDocumentRequests = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDocumentRequests(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.documentRequestsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find documentRequests";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchDocumentRequest = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.documentRequestFetched({ documentRequestForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDocumentRequestById(id)
    .then((response) => {
      const documentRequest = response.data;
      dispatch(
        actions.documentRequestFetched({
          documentRequestForEdit: documentRequest,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find documentRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDocumentRequest = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDocumentRequest(id)
    .then((response) => {
      dispatch(actions.documentRequestDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete documentRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createDocumentRequest =
  (documentRequestForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createDocumentRequest(documentRequestForCreation)
      .then((response) => {
        const documentRequest = response.data;
        dispatch(actions.documentRequestCreated(documentRequest));
      })
      .catch((error) => {
        error.clientMessage = "Can't create documentRequest";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateDocumentRequest = (documentRequest) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDocumentRequest(documentRequest)
    .then((response) => {
      dispatch(actions.documentRequestUpdated({ documentRequest }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update documentRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDocumentRequestsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDocumentRequests(ids, status)
    .then(() => {
      dispatch(actions.documentRequestsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update documentRequests status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDocumentRequests = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDocumentRequests(ids)
    .then(() => {
      dispatch(actions.documentRequestsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete documentRequests";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
