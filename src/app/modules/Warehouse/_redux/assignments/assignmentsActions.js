
import * as requestFromServer from "./assignmentsCrud";
import { assignmentsSlice, callTypes } from "./assignmentsSlice";
const { actions } = assignmentsSlice;
export const fetchAssignments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findAssignments(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.assignmentsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find assignments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAssignment = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.assignmentFetched({ assignmentForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getAssignmentById(id)  
    .then((response) => {
      const assignment = response.data;
      dispatch(actions.assignmentFetched({ assignmentForEdit: assignment }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find assignment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAssignment = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAssignment(id)  
    .then((response) => {
      dispatch(actions.assignmentDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete assignment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAssignment = (assignmentForCreation, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createAssignment(assignmentForCreation)  
    .then((response) => {
      const assignment = response.data;
      fnCallBack(assignment);

      dispatch(actions.assignmentCreated(assignment));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create assignment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAssignment = (id, assignment, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateAssignment(id, assignment)  
    .then((response) => {
      dispatch(actions.assignmentUpdated({ assignment }));
      fnCallBack(assignment);
    })  
    .catch((error) => {
      error.clientMessage = "Can't update assignment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAssignmentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForAssignments(ids, status)  
    .then(() => {
      dispatch(actions.assignmentsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update assignments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAssignments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAssignments(ids)  
    .then(() => {
      dispatch(actions.assignmentsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete assignments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 