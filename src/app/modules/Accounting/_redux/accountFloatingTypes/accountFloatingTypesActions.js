
import * as requestFromServer from "./accountFloatingTypesCrud";
import { accountFloatingTypesSlice, callTypes } from "./accountFloatingTypesSlice";
const { actions } = accountFloatingTypesSlice;
export const fetchAccountFloatingTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findAccountFloatingTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.accountFloatingTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find accountFloatingTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAccountFloatingType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.accountFloatingTypeFetched({ accountFloatingTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getAccountFloatingTypeById(id)  
    .then((response) => {
      const accountFloatingType = response.data;
      dispatch(actions.accountFloatingTypeFetched({ accountFloatingTypeForEdit: accountFloatingType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find accountFloatingType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAccountFloatingType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAccountFloatingType(id)  
    .then((response) => {
      dispatch(actions.accountFloatingTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloatingType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAccountFloatingType = (accountFloatingTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createAccountFloatingType(accountFloatingTypeForCreation)  
    .then((response) => {
      const accountFloatingType = response.data;
      dispatch(actions.accountFloatingTypeCreated(accountFloatingType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create accountFloatingType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAccountFloatingType = (id, accountFloatingType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateAccountFloatingType(id, accountFloatingType)  
    .then((response) => {
      dispatch(actions.accountFloatingTypeUpdated({ accountFloatingType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update accountFloatingType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAccountFloatingTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForAccountFloatingTypes(ids, status)  
    .then(() => {
      dispatch(actions.accountFloatingTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update accountFloatingTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAccountFloatingTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAccountFloatingTypes(ids)  
    .then(() => {
      dispatch(actions.accountFloatingTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloatingTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 