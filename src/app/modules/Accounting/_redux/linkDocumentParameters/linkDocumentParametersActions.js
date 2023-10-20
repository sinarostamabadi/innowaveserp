
import * as requestFromServer from "./linkDocumentParametersCrud";
import { linkDocumentParametersSlice, callTypes } from "./linkDocumentParametersSlice";
const { actions } = linkDocumentParametersSlice;
export const fetchLinkDocumentParameters = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findLinkDocumentParameters(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.linkDocumentParametersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find linkDocumentParameters";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchLinkDocumentParameter = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.linkDocumentParameterFetched({ linkDocumentParameterForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getLinkDocumentParameterById(id)  
    .then((response) => {
      const linkDocumentParameter = response.data;
      dispatch(actions.linkDocumentParameterFetched({ linkDocumentParameterForEdit: linkDocumentParameter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find linkDocumentParameter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLinkDocumentParameter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteLinkDocumentParameter(id)  
    .then((response) => {
      dispatch(actions.linkDocumentParameterDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete linkDocumentParameter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createLinkDocumentParameter = (linkDocumentParameterForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createLinkDocumentParameter(linkDocumentParameterForCreation)  
    .then((response) => {
      const linkDocumentParameter = response.data;
      dispatch(actions.linkDocumentParameterCreated(linkDocumentParameter));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create linkDocumentParameter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLinkDocumentParameter = (linkDocumentParameter) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateLinkDocumentParameter(linkDocumentParameter)  
    .then((response) => {
      dispatch(actions.linkDocumentParameterUpdated({ linkDocumentParameter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update linkDocumentParameter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLinkDocumentParametersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForLinkDocumentParameters(ids, status)  
    .then(() => {
      dispatch(actions.linkDocumentParametersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update linkDocumentParameters status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLinkDocumentParameters = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteLinkDocumentParameters(ids)  
    .then(() => {
      dispatch(actions.linkDocumentParametersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete linkDocumentParameters";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 