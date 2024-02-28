import * as requestFromServer from "./documentDtlsCrud";
import { documentDtlsSlice, callTypes } from "./documentDtlsSlice";
const { actions } = documentDtlsSlice;
export const fetchDocumentDtls = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDocumentDtls(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.documentDtlsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find documentDtls";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchDocumentDtl = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.documentDtlFetched({ documentDtlForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDocumentDtlById(id)
    .then((response) => {
      const documentDtl = response.data;
      dispatch(actions.documentDtlFetched({ documentDtlForEdit: documentDtl }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find documentDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDocumentDtl = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDocumentDtl(id)
    .then((response) => {
      dispatch(actions.documentDtlDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete documentDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createDocumentDtl =
  (documentDtlForCreation, fnCallback) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createDocumentDtl(documentDtlForCreation)
      .then((response) => {
        const documentDtl = response.data;
        fnCallback(documentDtl);

        dispatch(actions.documentDtlCreated(documentDtl));
      })
      .catch((error) => {
        error.clientMessage = "Can't create documentDtl";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateDocumentDtl = (documentDtl, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDocumentDtl(documentDtl)
    .then((response) => {
      dispatch(actions.documentDtlUpdated({ documentDtl }));

      fnCallback(response);
    })
    .catch((error) => {
      error.clientMessage = "Can't update documentDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDocumentDtlsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDocumentDtls(ids, status)
    .then(() => {
      dispatch(actions.documentDtlsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update documentDtls status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDocumentDtls = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDocumentDtls(ids)
    .then(() => {
      dispatch(actions.documentDtlsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete documentDtls";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
