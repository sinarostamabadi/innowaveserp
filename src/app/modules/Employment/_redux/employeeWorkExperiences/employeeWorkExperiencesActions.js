
import * as requestFromServer from "./employeeWorkExperiencesCrud";
import { employeeWorkExperiencesSlice, callTypes } from "./employeeWorkExperiencesSlice";
const { actions } = employeeWorkExperiencesSlice;
export const fetchEmployeeWorkExperiences = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEmployeeWorkExperiences(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.employeeWorkExperiencesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeWorkExperiences";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEmployeeWorkExperience = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.employeeWorkExperienceFetched({ employeeWorkExperienceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEmployeeWorkExperienceById(id)  
    .then((response) => {
      const employeeWorkExperience = response.data;
      dispatch(actions.employeeWorkExperienceFetched({ employeeWorkExperienceForEdit: employeeWorkExperience }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find employeeWorkExperience";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeWorkExperience = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeWorkExperience(id)  
    .then((response) => {
      dispatch(actions.employeeWorkExperienceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeWorkExperience";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEmployeeWorkExperience = (employeeWorkExperienceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEmployeeWorkExperience(employeeWorkExperienceForCreation)  
    .then((response) => {
      const employeeWorkExperience = response.data;
      dispatch(actions.employeeWorkExperienceCreated(employeeWorkExperience));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create employeeWorkExperience";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeWorkExperience = (employeeWorkExperience) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEmployeeWorkExperience(employeeWorkExperience)  
    .then((response) => {
      dispatch(actions.employeeWorkExperienceUpdated({ employeeWorkExperience }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeWorkExperience";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEmployeeWorkExperiencesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEmployeeWorkExperiences(ids, status)  
    .then(() => {
      dispatch(actions.employeeWorkExperiencesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update employeeWorkExperiences status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEmployeeWorkExperiences = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEmployeeWorkExperiences(ids)  
    .then(() => {
      dispatch(actions.employeeWorkExperiencesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete employeeWorkExperiences";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 