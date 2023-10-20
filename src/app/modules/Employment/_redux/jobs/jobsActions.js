
import * as requestFromServer from "./jobsCrud";
import { jobsSlice, callTypes } from "./jobsSlice";
const { actions } = jobsSlice;
export const fetchJobs = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findJobs(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.jobsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find jobs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchJob = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.jobFetched({ jobForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getJobById(id)  
    .then((response) => {
      const job = response.data;
      dispatch(actions.jobFetched({ jobForEdit: job }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find job";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteJob = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteJob(id)  
    .then((response) => {
      dispatch(actions.jobDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete job";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createJob = (jobForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createJob(jobForCreation)  
    .then((response) => {
      const job = response.data;
      dispatch(actions.jobCreated(job));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create job";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateJob = (job) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateJob(job)  
    .then((response) => {
      dispatch(actions.jobUpdated({ job }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update job";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateJobsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForJobs(ids, status)  
    .then(() => {
      dispatch(actions.jobsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update jobs status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteJobs = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteJobs(ids)  
    .then(() => {
      dispatch(actions.jobsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete jobs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 