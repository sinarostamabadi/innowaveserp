
import * as requestFromServer from "./employeeContractsCrud";
import { employeeContractsSlice, callTypes } from "./employeeContractsSlice";
const { actions } = employeeContractsSlice;
export const fetchEmployeeContracts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeeContracts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeContractsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeContracts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeContract = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeContractFetched({ employeeContractForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeeContractById(id)  
    .then((response) => {
      const employeeContract = response.data;
      dispatch(actions.employeeContractFetched({ employeeContractForEdit: employeeContract }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeContract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeContract = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeContract(id)  
    .then((response) => {
      dispatch(actions.employeeContractDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeContract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeContract = (employeeContractForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeeContract(employeeContractForCreation)  
    .then((response) => {
      const employeeContract = response.data;
      dispatch(actions.employeeContractCreated(employeeContract));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeeContract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeContract = (employeeContract) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeeContract(employeeContract)  
    .then((response) => {
      dispatch(actions.employeeContractUpdated({ employeeContract }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeContract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeContractsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeeContracts(ids, status)  
    .then(() => {
      dispatch(actions.employeeContractsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeContracts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeContracts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeContracts(ids)  
    .then(() => {
      dispatch(actions.employeeContractsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeContracts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 