
import * as requestFromServer from "./futsalTimePriceingCrud";
import { futsalTimePriceingSlice, callTypes } from "./futsalTimePriceingSlice";
const { actions } = futsalTimePriceingSlice;
export const fetchFutsalTimePriceings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findFutsalTimePriceings(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.futsalTimePriceingsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchFutsalTimePriceing = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.futsalTimePriceingFetched({ futsalTimePriceingForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getFutsalTimePriceingById(id)  
    .then((response) => {
      const futsalTimePriceing = response.data;
      dispatch(actions.futsalTimePriceingFetched({ futsalTimePriceingForEdit: futsalTimePriceing }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalTimePriceing = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalTimePriceing(id)  
    .then((response) => {
      dispatch(actions.futsalTimePriceingDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createFutsalTimePriceing = (futsalTimePriceingForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createFutsalTimePriceing(futsalTimePriceingForCreation)  
    .then((response) => {
      const futsalTimePriceing = response.data;
      dispatch(actions.futsalTimePriceingCreated(futsalTimePriceing));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create futsalTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalTimePriceing = (futsalTimePriceing) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateFutsalTimePriceing(futsalTimePriceing)  
    .then((response) => {
      dispatch(actions.futsalTimePriceingUpdated({ futsalTimePriceing }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalTimePriceingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForFutsalTimePriceing(ids, status)  
    .then(() => {
      dispatch(actions.futsalTimePriceingStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalTimePriceing status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalTimePriceings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalTimePriceings(ids)  
    .then(() => {
      dispatch(actions.futsalTimePriceingsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 