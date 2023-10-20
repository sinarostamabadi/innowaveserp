
import * as requestFromServer from "./employmentTypesCrud";
import { employmentTypesSlice, callTypes } from "./employmentTypesSlice";
const { actions } = employmentTypesSlice;
export const fetchEmploymentTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmploymentTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employmentTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employmentTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmploymentType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employmentTypeFetched({ employmentTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmploymentTypeById(id)  
    .then((response) => {
      const employmentType = response.data;
      dispatch(actions.employmentTypeFetched({ employmentTypeForEdit: employmentType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employmentType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmploymentType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmploymentType(id)  
    .then((response) => {
      dispatch(actions.employmentTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employmentType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmploymentType = (employmentTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmploymentType(employmentTypeForCreation)  
    .then((response) => {
      const employmentType = response.data;
      dispatch(actions.employmentTypeCreated(employmentType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employmentType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmploymentType = (employmentType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmploymentType(employmentType)  
    .then((response) => {
      dispatch(actions.employmentTypeUpdated({ employmentType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employmentType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmploymentTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmploymentTypes(ids, status)  
    .then(() => {
      dispatch(actions.employmentTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employmentTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmploymentTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmploymentTypes(ids)  
    .then(() => {
      dispatch(actions.employmentTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employmentTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 