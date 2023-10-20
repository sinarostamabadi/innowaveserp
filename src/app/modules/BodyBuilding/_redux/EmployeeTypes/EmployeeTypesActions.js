
import * as requestFromServer from "./EmployeeTypesCrud";
import { employeeTypesSlice, callTypes } from "./EmployeeTypesSlice";

const { actions } = employeeTypesSlice;
export const fetchEmployeeTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployeeTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeTypesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeTypeFetched({ employeeTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeTypeById(id)
    .then((response) => {
      const employeeType = response.data;
      dispatch(actions.employeeTypeFetched({ employeeTypeForEdit: employeeType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find employeeType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeType(id)
    .then((response) => {
      dispatch(actions.employeeTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeType = (employeeTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createEmployeeType(employeeTypeForCreation)
    .then((response) => {
      const employeeType = response.data;
      dispatch(actions.employeeTypeCreated(employeeType));
    })
    .catch((error) => {
      error.clientMessage = "Can't create employeeType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeType = (id, employeeType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEmployeeType(id, employeeType)
    .then((response) => {
      dispatch(actions.employeeTypeUpdated({ employeeType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEmployeeTypes(ids, status)
    .then(() => {
      dispatch(actions.employeeTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employeeTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployeeTypes(ids)
    .then(() => {
      dispatch(actions.employeeTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employeeTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 