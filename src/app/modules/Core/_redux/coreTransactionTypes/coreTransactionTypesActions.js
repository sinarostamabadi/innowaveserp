import * as requestFromServer from "./coreTransactionTypesCrud";
import { coreTransactionTypesSlice, callTypes } from "./coreTransactionTypesSlice";
const { actions } = coreTransactionTypesSlice;
export const fetchCoreTransactionTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCoreTransactionTypes(queryParams)  
    .then((response) => {
      const { items, totalCount } = response.data;
      dispatch(
        actions.coreTransactionTypesFetched({ totalCount: totalCount, entities: items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coreTransactionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoreTransactionType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.coreTransactionTypeFetched({ coreTransactionTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCoreTransactionTypeById(id)  
    .then((response) => {
      const coreTransactionType = response.data;
      dispatch(actions.coreTransactionTypeFetched({ coreTransactionTypeForEdit: coreTransactionType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coreTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoreTransactionType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoreTransactionType(id)  
    .then((response) => {
      dispatch(actions.coreTransactionTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coreTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createCoreTransactionType = (coreTransactionTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCoreTransactionType(coreTransactionTypeForCreation)  
    .then((response) => {
      const coreTransactionType = response.data;
      dispatch(actions.coreTransactionTypeCreated(coreTransactionType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create coreTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCoreTransactionType = (coreTransactionType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCoreTransactionType(coreTransactionType)  
    .then((response) => {
      console.log("response =>" , response);
      dispatch(actions.coreTransactionTypeUpdated({ coreTransactionType }));
    })  
    .catch((error) => {
      console.log("error =>" , error);
      error.clientMessage = "Can't update coreTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCoreTransactionTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCoreTransactionTypes(ids, status)  
    .then(() => {
      dispatch(actions.coreTransactionTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coreTransactionTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoreTransactionTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoreTransactionTypes(ids)  
    .then(() => {
      dispatch(actions.coreTransactionTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coreTransactionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
