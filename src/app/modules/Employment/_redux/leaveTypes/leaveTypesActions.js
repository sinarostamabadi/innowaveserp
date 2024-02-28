import * as requestFromServer from "./leaveTypesCrud";
import { leaveTypesSlice, callTypes } from "./leaveTypesSlice";
const { actions } = leaveTypesSlice;
export const fetchLeaveTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findLeaveTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.leaveTypesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find leaveTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchLeaveType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.leaveTypeFetched({ leaveTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLeaveTypeById(id)
    .then((response) => {
      const leaveType = response.data;
      dispatch(actions.leaveTypeFetched({ leaveTypeForEdit: leaveType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find leaveType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLeaveType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLeaveType(id)
    .then((response) => {
      dispatch(actions.leaveTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete leaveType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createLeaveType = (leaveTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createLeaveType(leaveTypeForCreation)
    .then((response) => {
      const leaveType = response.data;
      dispatch(actions.leaveTypeCreated(leaveType));
    })
    .catch((error) => {
      error.clientMessage = "Can't create leaveType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLeaveType = (leaveType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateLeaveType(leaveType)
    .then((response) => {
      dispatch(actions.leaveTypeUpdated({ leaveType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update leaveType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLeaveTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForLeaveTypes(ids, status)
    .then(() => {
      dispatch(actions.leaveTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update leaveTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLeaveTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLeaveTypes(ids)
    .then(() => {
      dispatch(actions.leaveTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete leaveTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
