
import * as requestFromServer from "./requestDtlsCrud";
import { requestDtlsSlice, callTypes } from "./requestDtlsSlice";
const { actions } = requestDtlsSlice;
export const fetchRequestDtls = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRequestDtls(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.requestDtlsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find requestDtls";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRequestDtl = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.requestDtlFetched({ requestDtlForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRequestDtlById(id)  
    .then((response) => {
      const requestDtl = response.data;
      dispatch(actions.requestDtlFetched({ requestDtlForEdit: requestDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find requestDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRequestDtl = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRequestDtl(id)  
    .then((response) => {
      dispatch(actions.requestDtlDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete requestDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRequestDtl = (requestDtlForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRequestDtl(requestDtlForCreation)  
    .then((response) => {
      const requestDtl = response.data;
      dispatch(actions.requestDtlCreated(requestDtl));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create requestDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRequestDtl = (requestDtl) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRequestDtl(requestDtl)  
    .then((response) => {
      dispatch(actions.requestDtlUpdated({ requestDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update requestDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRequestDtlsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRequestDtls(ids, status)  
    .then(() => {
      dispatch(actions.requestDtlsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update requestDtls status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRequestDtls = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRequestDtls(ids)  
    .then(() => {
      dispatch(actions.requestDtlsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete requestDtls";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 