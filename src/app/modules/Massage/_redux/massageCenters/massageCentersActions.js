
import * as requestFromServer from "./massageCentersCrud";
import { massageCentersSlice, callTypes } from "./massageCentersSlice";
const { actions } = massageCentersSlice;
export const fetchMassageCenters = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findMassageCenters(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.massageCentersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find massageCenters";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMassageCenter = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.massageCenterFetched({ massageCenterForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getMassageCenterById(id)  
    .then((response) => {
      const massageCenter = response.data;
      dispatch(actions.massageCenterFetched({ massageCenterForEdit: massageCenter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find massageCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteMassageCenter(id)  
    .then((response) => {
      dispatch(actions.massageCenterDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete massageCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMassageCenter = (massageCenterForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createMassageCenter(massageCenterForCreation)  
    .then((response) => {
      const massageCenter = response.data;
      dispatch(actions.massageCenterCreated(massageCenter));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create massageCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMassageCenter = (massageCenter) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateMassageCenter(massageCenter)  
    .then((response) => {
      dispatch(actions.massageCenterUpdated({ massageCenter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update massageCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMassageCentersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForMassageCenters(ids, status)  
    .then(() => {
      dispatch(actions.massageCentersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update massageCenters status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageCenters = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteMassageCenters(ids)  
    .then(() => {
      dispatch(actions.massageCentersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete massageCenters";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 