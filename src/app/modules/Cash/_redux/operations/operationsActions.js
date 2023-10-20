
import * as requestFromServer from "./operationsCrud";
import { operationsSlice, callTypes } from "./operationsSlice";
const { actions } = operationsSlice;
export const fetchOperations = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findOperations(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.operationsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find operations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchOperation = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.operationFetched({ operationForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getOperationById(id)  
    .then((response) => {
      const operation = response.data;
      dispatch(actions.operationFetched({ operationForEdit: operation }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find operation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOperation = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOperation(id)  
    .then((response) => {
      dispatch(actions.operationDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete operation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createOperation = (operationForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createOperation(operationForCreation)  
    .then((response) => {
      const operation = response.data;
      dispatch(actions.operationCreated(operation));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create operation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOperation = (operation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateOperation(operation)  
    .then((response) => {
      dispatch(actions.operationUpdated({ operation }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update operation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOperationsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForOperations(ids, status)  
    .then(() => {
      dispatch(actions.operationsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update operations status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOperations = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOperations(ids)  
    .then(() => {
      dispatch(actions.operationsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete operations";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 