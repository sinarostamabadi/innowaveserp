
import * as requestFromServer from "./employeeRewardPenaltiesCrud";
import { employeeRewardPenaltiesSlice, callTypes } from "./employeeRewardPenaltiesSlice";
const { actions } = employeeRewardPenaltiesSlice;
export const fetchEmployeeRewardPenalties = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeeRewardPenalties(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeRewardPenaltiesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeRewardPenalties";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeRewardPenalty = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeRewardPenaltyFetched({ employeeRewardPenaltyForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeeRewardPenaltyById(id)  
    .then((response) => {
      const employeeRewardPenalty = response.data;
      dispatch(actions.employeeRewardPenaltyFetched({ employeeRewardPenaltyForEdit: employeeRewardPenalty }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeRewardPenalty";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeRewardPenalty = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeRewardPenalty(id)  
    .then((response) => {
      dispatch(actions.employeeRewardPenaltyDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeRewardPenalty";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeRewardPenalty = (employeeRewardPenaltyForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeeRewardPenalty(employeeRewardPenaltyForCreation)  
    .then((response) => {
      const employeeRewardPenalty = response.data;
      dispatch(actions.employeeRewardPenaltyCreated(employeeRewardPenalty));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeeRewardPenalty";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeRewardPenalty = (employeeRewardPenalty) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeeRewardPenalty(employeeRewardPenalty)  
    .then((response) => {
      dispatch(actions.employeeRewardPenaltyUpdated({ employeeRewardPenalty }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeRewardPenalty";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeRewardPenaltiesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeeRewardPenalties(ids, status)  
    .then(() => {
      dispatch(actions.employeeRewardPenaltiesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeRewardPenalties status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeRewardPenalties = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeRewardPenalties(ids)  
    .then(() => {
      dispatch(actions.employeeRewardPenaltiesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeRewardPenalties";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 