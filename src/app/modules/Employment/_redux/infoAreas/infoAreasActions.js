
import * as requestFromServer from "./infoAreasCrud";
import { infoAreasSlice, callTypes } from "./infoAreasSlice";
const { actions } = infoAreasSlice;
export const fetchInfoAreas = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findInfoAreas(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.infoAreasFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find infoAreas";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchInfoArea = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.infoAreaFetched({ infoAreaForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getInfoAreaById(id)  
    .then((response) => {
      const infoArea = response.data;
      dispatch(actions.infoAreaFetched({ infoAreaForEdit: infoArea }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find infoArea";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInfoArea = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteInfoArea(id)  
    .then((response) => {
      dispatch(actions.infoAreaDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete infoArea";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createInfoArea = (infoAreaForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createInfoArea(infoAreaForCreation)  
    .then((response) => {
      const infoArea = response.data;
      dispatch(actions.infoAreaCreated(infoArea));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create infoArea";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInfoArea = (infoArea) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateInfoArea(infoArea)  
    .then((response) => {
      dispatch(actions.infoAreaUpdated({ infoArea }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update infoArea";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInfoAreasStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForInfoAreas(ids, status)  
    .then(() => {
      dispatch(actions.infoAreasStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update infoAreas status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInfoAreas = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteInfoAreas(ids)  
    .then(() => {
      dispatch(actions.infoAreasDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete infoAreas";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};