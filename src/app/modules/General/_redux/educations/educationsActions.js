import * as requestFromServer from "./educationsCrud";
import { educationsSlice, callTypes } from "./educationsSlice";
const { actions } = educationsSlice;
export const fetchEducations = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findEducations(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.educationsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find educations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEducation = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.educationFetched({ educationForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getEducationById(id)  
    .then((response) => {
      const education = response.data;
      dispatch(actions.educationFetched({ educationForEdit: education }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find education";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEducation = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEducation(id)  
    .then((response) => {
      dispatch(actions.educationDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete education";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEducation = (educationForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createEducation(educationForCreation)  
    .then((response) => {
      const education = response.data;
      dispatch(actions.educationCreated(education));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create education";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEducation = (education) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateEducation(education)  
    .then((response) => {
      dispatch(actions.educationUpdated({ education }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update education";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEducationsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForEducations(ids, status)  
    .then(() => {
      dispatch(actions.educationsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update educations status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEducations = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteEducations(ids)  
    .then(() => {
      dispatch(actions.educationsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete educations";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 