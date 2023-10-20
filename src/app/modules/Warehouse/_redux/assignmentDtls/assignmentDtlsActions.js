
import * as requestFromServer from "./assignmentDtlsCrud";
import { assignmentDtlsSlice, callTypes } from "./assignmentDtlsSlice";
const { actions } = assignmentDtlsSlice;
export const fetchAssignmentDtls = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findAssignmentDtls(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.assignmentDtlsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find assignmentDtls";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAssignmentDtl = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.assignmentDtlFetched({ assignmentDtlForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getAssignmentDtlById(id)  
    .then((response) => {
      const assignmentDtl = response.data;
      dispatch(actions.assignmentDtlFetched({ assignmentDtlForEdit: assignmentDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find assignmentDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAssignmentDtl = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAssignmentDtl(id)  
    .then((response) => {
      dispatch(actions.assignmentDtlDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete assignmentDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAssignmentDtl = (assignmentDtlForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createAssignmentDtl(assignmentDtlForCreation)  
    .then((response) => {
      const assignmentDtl = response.data;
      dispatch(actions.assignmentDtlCreated(assignmentDtl));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create assignmentDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAssignmentDtl = (assignmentDtl) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateAssignmentDtl(assignmentDtl)  
    .then((response) => {
      dispatch(actions.assignmentDtlUpdated({ assignmentDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update assignmentDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateAssignmentDtlsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForAssignmentDtls(ids, status)  
    .then(() => {
      dispatch(actions.assignmentDtlsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update assignmentDtls status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAssignmentDtls = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteAssignmentDtls(ids)  
    .then(() => {
      dispatch(actions.assignmentDtlsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete assignmentDtls";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 