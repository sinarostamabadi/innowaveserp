import * as requestFromServer from "./poolTimePriceingCrud";
import { poolTimePriceingSlice, callTypes } from "./poolTimePriceingSlice";
const { actions } = poolTimePriceingSlice;
export const fetchPoolTimePriceing = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPoolTimePriceing(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.poolTimePriceingFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find poolTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPoolTimePriceing = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.poolTimePriceingFetched({ poolTimePriceingForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPoolTimePriceingById(id)
    .then((response) => {
      const poolTimePriceing = response.data;
      dispatch(
        actions.poolTimePriceingFetched({
          poolTimePriceingForEdit: poolTimePriceing,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find poolTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolTimePriceing = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoolTimePriceing(id)
    .then((response) => {
      dispatch(actions.poolTimePriceingDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poolTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPoolTimePriceing =
  (poolTimePriceingForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createPoolTimePriceing(poolTimePriceingForCreation)
      .then((response) => {
        const poolTimePriceing = response.data;
        dispatch(actions.poolTimePriceingCreated(poolTimePriceing));
      })
      .catch((error) => {
        error.clientMessage = "Can't create poolTimePriceing";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updatePoolTimePriceing = (poolTimePriceing) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePoolTimePriceing(poolTimePriceing)
    .then((response) => {
      dispatch(actions.poolTimePriceingUpdated({ poolTimePriceing }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poolTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePoolTimePriceingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPoolTimePriceing(ids, status)
    .then(() => {
      dispatch(actions.poolTimePriceingStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poolTimePriceing status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolTimePriceing = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoolTimePriceing(ids)
    .then(() => {
      dispatch(actions.poolTimePriceingDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poolTimePriceing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
