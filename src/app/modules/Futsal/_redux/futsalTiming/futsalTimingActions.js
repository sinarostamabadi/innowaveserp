
import * as requestFromServer from "./futsalTimingCrud";
import { futsalTimingSlice, callTypes } from "./futsalTimingSlice";
const { actions } = futsalTimingSlice;
export const fetchFutsalTimings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findFutsalTimings(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.futsalTimingsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalTiming";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchFutsalTiming = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.futsalTimingFetched({ futsalTimingForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getFutsalTimingById(id)  
    .then((response) => {
      const futsalTiming = response.data;
      dispatch(actions.futsalTimingFetched({ futsalTimingForEdit: futsalTiming }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalTiming";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalTiming = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalTiming(id)  
    .then((response) => {
      dispatch(actions.futsalTimingDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalTiming";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createFutsalTiming = (futsalTimingForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createFutsalTiming(futsalTimingForCreation)  
    .then((response) => {
      const futsalTiming = response.data;
      dispatch(actions.futsalTimingCreated(futsalTiming));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create futsalTiming";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalTiming = (futsalTiming) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateFutsalTiming(futsalTiming)  
    .then((response) => {
      dispatch(actions.futsalTimingUpdated({ futsalTiming }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalTiming";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalTimingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForFutsalTiming(ids, status)  
    .then(() => {
      dispatch(actions.futsalTimingStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalTiming status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalTimings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalTimings(ids)  
    .then(() => {
      dispatch(actions.futsalTimingsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalTiming";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 