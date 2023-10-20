
import * as requestFromServer from "./codingCrud";
import { codingSlice, callTypes } from "./codingSlice";
const { actions } = codingSlice;
export const fetchCoding = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCoding(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.codingFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coding";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoding = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.codingFetched({ codingForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCodingById(id)  
    .then((response) => {
      const coding = response.data;
      dispatch(actions.codingFetched({ codingForEdit: coding }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coding";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoding = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoding(id)  
    .then((response) => {
      dispatch(actions.codingDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coding";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCoding = (codingForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCoding(codingForCreation)  
    .then((response) => {
      const coding = response.data;
      dispatch(actions.codingCreated(coding));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create coding";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoding = (coding) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCoding(coding)  
    .then((response) => {
      dispatch(actions.codingUpdated({ coding }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coding";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCodingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCoding(ids, status)  
    .then(() => {
      dispatch(actions.codingStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coding status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoding = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoding(ids)  
    .then(() => {
      dispatch(actions.codingDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coding";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};