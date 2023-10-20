
import * as requestFromServer from "./requestsCrud";
import { requestsSlice, callTypes } from "./requestsSlice";
const { actions } = requestsSlice;
export const fetchRequests = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRequests(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.requestsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find requests";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRequest = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.requestFetched({ requestForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRequestById(id)  
    .then((response) => {
      const request = response.data;
      dispatch(actions.requestFetched({ requestForEdit: request }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find request";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRequest = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRequest(id)  
    .then((response) => {
      dispatch(actions.requestDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete request";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRequest = (requestForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRequest(requestForCreation)  
    .then((response) => {
      const request = response.data;
      dispatch(actions.requestCreated(request));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create request";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRequest = (request) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRequest(request)  
    .then((response) => {
      dispatch(actions.requestUpdated({ request }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update request";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRequestsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRequests(ids, status)  
    .then(() => {
      dispatch(actions.requestsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update requests status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRequests = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRequests(ids)  
    .then(() => {
      dispatch(actions.requestsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete requests";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 