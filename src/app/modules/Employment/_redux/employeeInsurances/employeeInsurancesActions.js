
import * as requestFromServer from "./employeeInsurancesCrud";
import { employeeInsurancesSlice, callTypes } from "./employeeInsurancesSlice";
const { actions } = employeeInsurancesSlice;
export const fetchEmployeeInsurances = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeeInsurances(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeInsurancesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeInsurances";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeInsurance = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeInsuranceFetched({ employeeInsuranceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeeInsuranceById(id)  
    .then((response) => {
      const employeeInsurance = response.data;
      dispatch(actions.employeeInsuranceFetched({ employeeInsuranceForEdit: employeeInsurance }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeInsurance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeInsurance = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeInsurance(id)  
    .then((response) => {
      dispatch(actions.employeeInsuranceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeInsurance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeInsurance = (employeeInsuranceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeeInsurance(employeeInsuranceForCreation)  
    .then((response) => {
      const employeeInsurance = response.data;
      dispatch(actions.employeeInsuranceCreated(employeeInsurance));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeeInsurance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeInsurance = (employeeInsurance) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeeInsurance(employeeInsurance)  
    .then((response) => {
      dispatch(actions.employeeInsuranceUpdated({ employeeInsurance }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeInsurance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeInsurancesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeeInsurances(ids, status)  
    .then(() => {
      dispatch(actions.employeeInsurancesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeInsurances status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeInsurances = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeInsurances(ids)  
    .then(() => {
      dispatch(actions.employeeInsurancesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeInsurances";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 