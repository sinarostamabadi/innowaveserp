
import * as requestFromServer from "./bodyBuildingCentersCrud";
import { bodyBuildingCentersSlice, callTypes } from "./bodyBuildingCentersSlice";
const { actions } = bodyBuildingCentersSlice;
export const fetchBodyBuildingCenters = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBodyBuildingCenters(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bodyBuildingCentersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingCenters";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBodyBuildingCenter = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bodyBuildingCenterFetched({ bodyBuildingCenterForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBodyBuildingCenterById(id)  
    .then((response) => {
      const bodyBuildingCenter = response.data;
      dispatch(actions.bodyBuildingCenterFetched({ bodyBuildingCenterForEdit: bodyBuildingCenter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBodyBuildingCenter(id)  
    .then((response) => {
      dispatch(actions.bodyBuildingCenterDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBodyBuildingCenter = (bodyBuildingCenterForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBodyBuildingCenter(bodyBuildingCenterForCreation)  
    .then((response) => {
      const bodyBuildingCenter = response.data;
      dispatch(actions.bodyBuildingCenterCreated(bodyBuildingCenter));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create bodyBuildingCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBodyBuildingCenter = (bodyBuildingCenter) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBodyBuildingCenter(bodyBuildingCenter)  
    .then((response) => {
      dispatch(actions.bodyBuildingCenterUpdated({ bodyBuildingCenter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bodyBuildingCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBodyBuildingCentersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBodyBuildingCenters(ids, status)  
    .then(() => {
      dispatch(actions.bodyBuildingCentersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bodyBuildingCenters status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingCenters = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBodyBuildingCenters(ids)  
    .then(() => {
      dispatch(actions.bodyBuildingCentersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingCenters";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 