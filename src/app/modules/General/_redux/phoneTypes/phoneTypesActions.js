
import * as requestFromServer from "./phoneTypesCrud";
import { phoneTypesSlice, callTypes } from "./phoneTypesSlice";
const { actions } = phoneTypesSlice;
export const fetchPhoneTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findPhoneTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.phoneTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find phoneTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPhoneType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.phoneTypeFetched({ phoneTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPhoneTypeById(id)  
    .then((response) => {
      const phoneType = response.data;
      dispatch(actions.phoneTypeFetched({ phoneTypeForEdit: phoneType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find phoneType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePhoneType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePhoneType(id)  
    .then((response) => {
      dispatch(actions.phoneTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete phoneType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPhoneType = (phoneTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPhoneType(phoneTypeForCreation)  
    .then((response) => {
      const phoneType = response.data;
      dispatch(actions.phoneTypeCreated(phoneType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create phoneType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePhoneType = (id, phoneType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePhoneType(id, phoneType)  
    .then((response) => {
      dispatch(actions.phoneTypeUpdated({ phoneType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update phoneType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePhoneTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForPhoneTypes(ids, status)  
    .then(() => {
      dispatch(actions.phoneTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update phoneTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePhoneTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePhoneTypes(ids)  
    .then(() => {
      dispatch(actions.phoneTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete phoneTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};