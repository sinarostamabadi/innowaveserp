
import * as requestFromServer from "./insuranceJobsCrud";
import { insuranceJobsSlice, callTypes } from "./insuranceJobsSlice";
const { actions } = insuranceJobsSlice;
export const fetchInsuranceJobs = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findInsuranceJobs(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.insuranceJobsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find insuranceJobs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchInsuranceJob = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.insuranceJobFetched({ insuranceJobForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getInsuranceJobById(id)  
    .then((response) => {
      const insuranceJob = response.data;
      dispatch(actions.insuranceJobFetched({ insuranceJobForEdit: insuranceJob }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find insuranceJob";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInsuranceJob = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteInsuranceJob(id)  
    .then((response) => {
      dispatch(actions.insuranceJobDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete insuranceJob";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createInsuranceJob = (insuranceJobForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createInsuranceJob(insuranceJobForCreation)  
    .then((response) => {
      const insuranceJob = response.data;
      dispatch(actions.insuranceJobCreated(insuranceJob));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create insuranceJob";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInsuranceJob = (insuranceJob) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateInsuranceJob(insuranceJob)  
    .then((response) => {
      dispatch(actions.insuranceJobUpdated({ insuranceJob }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update insuranceJob";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInsuranceJobsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForInsuranceJobs(ids, status)  
    .then(() => {
      dispatch(actions.insuranceJobsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update insuranceJobs status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInsuranceJobs = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteInsuranceJobs(ids)  
    .then(() => {
      dispatch(actions.insuranceJobsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete insuranceJobs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 