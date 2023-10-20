import * as requestFromServer from "./coreTransactionPlacesCrud";
import { coreTransactionPlacesSlice, callTypes } from "./coreTransactionPlacesSlice";
const { actions } = coreTransactionPlacesSlice;
export const fetchCoreTransactionPlaces = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCoreTransactionPlaces(queryParams)  
    .then((response) => {
      const { items, totalCount } = response.data;
      dispatch(
        actions.coreTransactionPlacesFetched({ totalCount: totalCount, entities: items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coreTransactionPlaces";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoreTransactionPlace = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.coreTransactionPlaceFetched({ coreTransactionPlaceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCoreTransactionPlaceById(id)  
    .then((response) => {
      const coreTransactionPlace = response.data;
      dispatch(actions.coreTransactionPlaceFetched({ coreTransactionPlaceForEdit: coreTransactionPlace }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coreTransactionPlace";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoreTransactionPlace = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoreTransactionPlace(id)  
    .then((response) => {
      dispatch(actions.coreTransactionPlaceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coreTransactionPlace";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createCoreTransactionPlace = (coreTransactionPlaceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCoreTransactionPlace(coreTransactionPlaceForCreation)  
    .then((response) => {
      const coreTransactionPlace = response.data;
      dispatch(actions.coreTransactionPlaceCreated(coreTransactionPlace));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create coreTransactionPlace";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCoreTransactionPlace = (coreTransactionPlace) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCoreTransactionPlace(coreTransactionPlace)  
    .then((response) => {
      console.log("response =>" , response);
      dispatch(actions.coreTransactionPlaceUpdated({ coreTransactionPlace }));
    })  
    .catch((error) => {
      console.log("error =>" , error);
      error.clientMessage = "Can't update coreTransactionPlace";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCoreTransactionPlacesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCoreTransactionPlaces(ids, status)  
    .then(() => {
      dispatch(actions.coreTransactionPlacesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coreTransactionPlaces status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoreTransactionPlaces = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoreTransactionPlaces(ids)  
    .then(() => {
      dispatch(actions.coreTransactionPlacesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coreTransactionPlaces";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
