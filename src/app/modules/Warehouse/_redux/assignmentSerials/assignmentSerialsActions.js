
import * as requestFromServer from "./assignmentSerialsCrud";
import { assignmentSerialsSlice, callTypes } from "./assignmentSerialsSlice";
const { actions } = assignmentSerialsSlice;
export const fetchAssignmentSerials = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findAssignmentSerials(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.assignmentSerialsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find assignmentSerials";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAssignmentSerial = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.assignmentSerialFetched({ assignmentSerialForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getAssignmentSerialById(id)  
    .then((response) => {
      const assignmentSerial = response.data;
      dispatch(actions.assignmentSerialFetched({ assignmentSerialForEdit: assignmentSerial }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find assignmentSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAssignmentSerial = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAssignmentSerial(id)  
    .then((response) => {
      dispatch(actions.assignmentSerialDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete assignmentSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAssignmentSerial = (assignmentSerialForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createAssignmentSerial(assignmentSerialForCreation)  
    .then((response) => {
      const assignmentSerial = response.data;
      dispatch(actions.assignmentSerialCreated(assignmentSerial));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create assignmentSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAssignmentSerial = (assignmentSerial) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateAssignmentSerial(assignmentSerial)  
    .then((response) => {
      dispatch(actions.assignmentSerialUpdated({ assignmentSerial }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update assignmentSerial";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAssignmentSerialsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForAssignmentSerials(ids, status)  
    .then(() => {
      dispatch(actions.assignmentSerialsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update assignmentSerials status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAssignmentSerials = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAssignmentSerials(ids)  
    .then(() => {
      dispatch(actions.assignmentSerialsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete assignmentSerials";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 