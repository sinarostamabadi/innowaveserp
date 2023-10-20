
import * as requestFromServer from "./organizationChartEmployeesCrud";
import { organizationChartEmployeesSlice, callTypes } from "./organizationChartEmployeesSlice";
const { actions } = organizationChartEmployeesSlice;
export const fetchOrganizationChartEmployees = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findOrganizationChartEmployees(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.organizationChartEmployeesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find organizationChartEmployees";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchOrganizationChartEmployee = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.organizationChartEmployeeFetched({ organizationChartEmployeeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getOrganizationChartEmployeeById(id)  
    .then((response) => {
      const organizationChartEmployee = response.data;
      dispatch(actions.organizationChartEmployeeFetched({ organizationChartEmployeeForEdit: organizationChartEmployee }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find organizationChartEmployee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationChartEmployee = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOrganizationChartEmployee(id)  
    .then((response) => {
      dispatch(actions.organizationChartEmployeeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete organizationChartEmployee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createOrganizationChartEmployee = (organizationChartEmployeeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createOrganizationChartEmployee(organizationChartEmployeeForCreation)  
    .then((response) => {
      const organizationChartEmployee = response.data;
      dispatch(actions.organizationChartEmployeeCreated(organizationChartEmployee));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create organizationChartEmployee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOrganizationChartEmployee = (organizationChartEmployee) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateOrganizationChartEmployee(organizationChartEmployee)  
    .then((response) => {
      dispatch(actions.organizationChartEmployeeUpdated({ organizationChartEmployee }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update organizationChartEmployee";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateOrganizationChartEmployeesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForOrganizationChartEmployees(ids, status)  
    .then(() => {
      dispatch(actions.organizationChartEmployeesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update organizationChartEmployees status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteOrganizationChartEmployees = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteOrganizationChartEmployees(ids)  
    .then(() => {
      dispatch(actions.organizationChartEmployeesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete organizationChartEmployees";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 