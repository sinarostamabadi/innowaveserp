
import * as requestFromServer from "./timePriceingCrud";
import { timePriceingSlice, callTypes } from "./timePriceingSlice";
const { actions } = timePriceingSlice;
export const fetchTimePriceings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findTimePriceings(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.timePriceingsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find timePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchTimePriceing = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.timePriceingFetched({ timePriceingForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getTimePriceingById(id)  
    .then((response) => {
      const timePriceing = response.data;
      dispatch(actions.timePriceingFetched({ timePriceingForEdit: timePriceing }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find timePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTimePriceing = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteTimePriceing(id)  
    .then((response) => {
      dispatch(actions.timePriceingDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete timePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createTimePriceing = (timePriceingForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createTimePriceing(timePriceingForCreation)  
    .then((response) => {
      const timePriceing = response.data;
      dispatch(actions.timePriceingCreated(timePriceing));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create timePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTimePriceing = (timePriceing) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateTimePriceing(timePriceing)  
    .then((response) => {
      dispatch(actions.timePriceingUpdated({ timePriceing }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update timePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTimePriceingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForTimePriceing(ids, status)  
    .then(() => {
      dispatch(actions.timePriceingStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update timePriceing status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTimePriceings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteTimePriceings(ids)  
    .then(() => {
      dispatch(actions.timePriceingDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete timePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 