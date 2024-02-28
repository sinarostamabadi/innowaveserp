import * as requestFromServer from "./poolReservesCrud";
import { poolReservesSlice, callTypes } from "./poolReservesSlice";
const { actions } = poolReservesSlice;
export const fetchPoolReserves = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPoolReserves(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.poolReservesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find poolReserves";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPoolReserve = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.poolReserveFetched({ poolReserveForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPoolReserveById(id)
    .then((response) => {
      const poolReserve = response.data;
      dispatch(actions.poolReserveFetched({ poolReserveForEdit: poolReserve }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find poolReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolReserve = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoolReserve(id)
    .then((response) => {
      dispatch(actions.poolReserveDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poolReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPoolReserve = (poolReserveForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPoolReserve(poolReserveForCreation)
    .then((response) => {
      const poolReserve = response.data;
      dispatch(actions.poolReserveCreated(poolReserve));
    })
    .catch((error) => {
      error.clientMessage = "Can't create poolReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePoolReserve = (poolReserve) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePoolReserve(poolReserve)
    .then((response) => {
      dispatch(actions.poolReserveUpdated({ poolReserve }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poolReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePoolReservesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPoolReserves(ids, status)
    .then(() => {
      dispatch(actions.poolReservesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poolReserves status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolReserves = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoolReserves(ids)
    .then(() => {
      dispatch(actions.poolReservesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poolReserves";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
