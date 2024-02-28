import * as requestFromServer from "./poolReservePricesCrud";
import { poolReservePricesSlice, callTypes } from "./poolReservePricesSlice";
const { actions } = poolReservePricesSlice;
export const fetchPoolReservePrices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPoolReservePrices(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.poolReservePricesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find poolReservePrices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPoolReservePrice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.poolReservePriceFetched({ poolReservePriceForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPoolReservePriceById(id)
    .then((response) => {
      const poolReservePrice = response.data;
      dispatch(
        actions.poolReservePriceFetched({
          poolReservePriceForEdit: poolReservePrice,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find poolReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolReservePrice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoolReservePrice(id)
    .then((response) => {
      dispatch(actions.poolReservePriceDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poolReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPoolReservePrice =
  (poolReservePriceForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createPoolReservePrice(poolReservePriceForCreation)
      .then((response) => {
        const poolReservePrice = response.data;
        dispatch(actions.poolReservePriceCreated(poolReservePrice));
      })
      .catch((error) => {
        error.clientMessage = "Can't create poolReservePrice";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updatePoolReservePrice = (poolReservePrice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePoolReservePrice(poolReservePrice)
    .then((response) => {
      dispatch(actions.poolReservePriceUpdated({ poolReservePrice }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poolReservePrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePoolReservePricesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPoolReservePrices(ids, status)
    .then(() => {
      dispatch(actions.poolReservePricesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poolReservePrices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolReservePrices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoolReservePrices(ids)
    .then(() => {
      dispatch(actions.poolReservePricesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poolReservePrices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
