
import * as requestFromServer from "./employmentStatusesCrud";
import { employmentStatusesSlice, callTypes } from "./employmentStatusesSlice";
const { actions } = employmentStatusesSlice;
export const fetchEmploymentStatuses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmploymentStatuses(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employmentStatusesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employmentStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmploymentStatus = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employmentStatusFetched({ employmentStatusForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmploymentStatusById(id)  
    .then((response) => {
      const employmentStatus = response.data;
      dispatch(actions.employmentStatusFetched({ employmentStatusForEdit: employmentStatus }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employmentStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmploymentStatus = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmploymentStatus(id)  
    .then((response) => {
      dispatch(actions.employmentStatusDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employmentStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmploymentStatus = (employmentStatusForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmploymentStatus(employmentStatusForCreation)  
    .then((response) => {
      const employmentStatus = response.data;
      dispatch(actions.employmentStatusCreated(employmentStatus));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employmentStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmploymentStatus = (employmentStatus) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmploymentStatus(employmentStatus)  
    .then((response) => {
      dispatch(actions.employmentStatusUpdated({ employmentStatus }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employmentStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmploymentStatusesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmploymentStatuses(ids, status)  
    .then(() => {
      dispatch(actions.employmentStatusesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employmentStatuses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmploymentStatuses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmploymentStatuses(ids)  
    .then(() => {
      dispatch(actions.employmentStatusesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employmentStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 