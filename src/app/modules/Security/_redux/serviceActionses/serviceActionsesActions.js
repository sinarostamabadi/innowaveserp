
import * as requestFromServer from "./serviceActionsesCrud";
import { serviceActionsesSlice, callTypes } from "./serviceActionsesSlice";
const { actions } = serviceActionsesSlice;
export const fetchServiceActionses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findServiceActionses(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.serviceActionsesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find serviceActionses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchServiceActions = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.serviceActionsFetched({ serviceActionsForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getServiceActionsById(id)  
    .then((response) => {
      const serviceActions = response.data;
      dispatch(actions.serviceActionsFetched({ serviceActionsForEdit: serviceActions }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find serviceActions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteServiceActions = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteServiceActions(id)  
    .then((response) => {
      dispatch(actions.serviceActionsDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete serviceActions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createServiceActions = (serviceActionsForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createServiceActions(serviceActionsForCreation)  
    .then((response) => {
      const serviceActions = response.data;
      dispatch(actions.serviceActionsCreated(serviceActions));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create serviceActions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateServiceActions = (serviceActions) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateServiceActions(serviceActions)  
    .then((response) => {
      dispatch(actions.serviceActionsUpdated({ serviceActions }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update serviceActions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateServiceActionsesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForServiceActionses(ids, status)  
    .then(() => {
      dispatch(actions.serviceActionsesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update serviceActionses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteServiceActionses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteServiceActionses(ids)  
    .then(() => {
      dispatch(actions.serviceActionsesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete serviceActionses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 