
import * as requestFromServer from "./operationTypesCrud";
import { operationTypesSlice, callTypes } from "./operationTypesSlice";
const { actions } = operationTypesSlice;
export const fetchOperationTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findOperationTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.operationTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find operationTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchOperationType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.operationTypeFetched({ operationTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getOperationTypeById(id)  
    .then((response) => {
      const operationType = response.data;
      dispatch(actions.operationTypeFetched({ operationTypeForEdit: operationType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find operationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOperationType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOperationType(id)  
    .then((response) => {
      dispatch(actions.operationTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete operationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createOperationType = (operationTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createOperationType(operationTypeForCreation)  
    .then((response) => {
      const operationType = response.data;
      dispatch(actions.operationTypeCreated(operationType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create operationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOperationType = (operationType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateOperationType(operationType)  
    .then((response) => {
      dispatch(actions.operationTypeUpdated({ operationType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update operationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOperationTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForOperationTypes(ids, status)  
    .then(() => {
      dispatch(actions.operationTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update operationTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOperationTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOperationTypes(ids)  
    .then(() => {
      dispatch(actions.operationTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete operationTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 