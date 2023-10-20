
import * as requestFromServer from "./poolCentersCrud";
import { poolCentersSlice, callTypes } from "./poolCentersSlice";
const { actions } = poolCentersSlice;
export const fetchPoolCenters = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findPoolCenters(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.poolCentersFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find poolCenters";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPoolCenter = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.poolCenterFetched({ poolCenterForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPoolCenterById(id)  
    .then((response) => {
      const poolCenter = response.data;
      dispatch(actions.poolCenterFetched({ poolCenterForEdit: poolCenter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find poolCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePoolCenter(id)  
    .then((response) => {
      dispatch(actions.poolCenterDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete poolCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPoolCenter = (poolCenterForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPoolCenter(poolCenterForCreation)  
    .then((response) => {
      const poolCenter = response.data;
      dispatch(actions.poolCenterCreated(poolCenter));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create poolCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePoolCenter = (poolCenter) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePoolCenter(poolCenter)  
    .then((response) => {
      dispatch(actions.poolCenterUpdated({ poolCenter }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update poolCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePoolCentersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForPoolCenters(ids, status)  
    .then(() => {
      dispatch(actions.poolCentersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update poolCenters status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolCenters = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePoolCenters(ids)  
    .then(() => {
      dispatch(actions.poolCentersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete poolCenters";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 