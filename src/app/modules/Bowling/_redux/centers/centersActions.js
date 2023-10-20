
import * as requestFromServer from "./centersCrud";
import { centersSlice, callTypes } from "./centersSlice";
const { actions } = centersSlice;
export const fetchCenters = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCenters(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.centersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find centers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCenter = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.centerFetched({ centerForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCenterById(id)  
    .then((response) => {
      const center = response.data;
      dispatch(actions.centerFetched({ centerForEdit: center }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find center";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCenter(id)  
    .then((response) => {
      dispatch(actions.centerDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete center";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCenter = (centerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCenter(centerForCreation)  
    .then((response) => {
      const center = response.data;
      dispatch(actions.centerCreated(center));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create center";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCenter = (center) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCenter(center)  
    .then((response) => {
      dispatch(actions.centerUpdated({ center }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update center";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCentersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCenters(ids, status)  
    .then(() => {
      dispatch(actions.centersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update centers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCenters = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCenters(ids)  
    .then(() => {
      dispatch(actions.centersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete centers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 