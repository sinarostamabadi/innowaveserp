import * as requestFromServer from "./billiardCentersCrud";
import { billiardCentersSlice, callTypes } from "./billiardCentersSlice";
const { actions } = billiardCentersSlice;
export const fetchBilliardCenters = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBilliardCenters(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.billiardCentersFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find billiardCenters";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBilliardCenter = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.billiardCenterFetched({ billiardCenterForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBilliardCenterById(id)
    .then((response) => {
      const billiardCenter = response.data;
      dispatch(
        actions.billiardCenterFetched({ billiardCenterForEdit: billiardCenter })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find billiardCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBilliardCenter(id)
    .then((response) => {
      dispatch(actions.billiardCenterDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete billiardCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBilliardCenter =
  (billiardCenterForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createBilliardCenter(billiardCenterForCreation)
      .then((response) => {
        const billiardCenter = response.data;
        dispatch(actions.billiardCenterCreated(billiardCenter));
      })
      .catch((error) => {
        error.clientMessage = "Can't create billiardCenter";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBilliardCenter = (billiardCenter) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBilliardCenter(billiardCenter)
    .then((response) => {
      dispatch(actions.billiardCenterUpdated({ billiardCenter }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update billiardCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBilliardCentersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBilliardCenters(ids, status)
    .then(() => {
      dispatch(actions.billiardCentersStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update billiardCenters status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardCenters = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBilliardCenters(ids)
    .then(() => {
      dispatch(actions.billiardCentersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete billiardCenters";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
