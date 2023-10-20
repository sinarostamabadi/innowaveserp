
import * as requestFromServer from "./EmployeesCrud";
import { employeesSlice, callTypes } from "./EmployeesSlice";
const { actions } = employeesSlice;
export const fetchEmployees = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEmployees(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find employees";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployee = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeFetched({ employeeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEmployeeById(id)
    .then((response) => {
      const employee = response.data;
      dispatch(actions.employeeFetched({ employeeForEdit: employee }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployee = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployee(id)
    .then((response) => {
      dispatch(actions.employeeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployee = (employeeForCreation, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createEmployee(employeeForCreation)
    .then((response) => {
      const employee = response.data;
      fnCallBack(employee);
      
      dispatch(actions.employeeCreated(employee));

      return employee;
    })
    .catch((error) => {
      error.clientMessage = "Can't create employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployee = (id, employee, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEmployee(id, employee)
    .then((response) => {
      fnCallBack(employee);

      dispatch(actions.employeeUpdated({ employee }));

      return employee;
    })
    .catch((error) => {
      error.clientMessage = "Can't update employee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEmployees(ids, status)
    .then(() => {
      dispatch(actions.employeesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update employees status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployees = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEmployees(ids)
    .then(() => {
      dispatch(actions.employeesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete employees";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 