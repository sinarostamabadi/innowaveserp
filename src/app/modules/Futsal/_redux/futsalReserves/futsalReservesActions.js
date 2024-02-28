import * as requestFromServer from "./futsalReservesCrud";
import { futsalReservesSlice, callTypes } from "./futsalReservesSlice";
const { actions } = futsalReservesSlice;
export const fetchFutsalReserves = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findFutsalReserves(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.futsalReservesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find futsalReserves";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchFutsalReserve = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.futsalReserveFetched({ futsalReserveForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getFutsalReserveById(id)
    .then((response) => {
      const futsalReserve = response.data;
      dispatch(
        actions.futsalReserveFetched({ futsalReserveForEdit: futsalReserve })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find futsalReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalReserve = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteFutsalReserve(id)
    .then((response) => {
      dispatch(actions.futsalReserveDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete futsalReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createFutsalReserve = (futsalReserveForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createFutsalReserve(futsalReserveForCreation)
    .then((response) => {
      const futsalReserve = response.data;
      dispatch(actions.futsalReserveCreated(futsalReserve));
    })
    .catch((error) => {
      error.clientMessage = "Can't create futsalReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalReserve = (futsalReserve) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateFutsalReserve(futsalReserve)
    .then((response) => {
      dispatch(actions.futsalReserveUpdated({ futsalReserve }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update futsalReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalReservesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForFutsalReserves(ids, status)
    .then(() => {
      dispatch(actions.futsalReservesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update futsalReserves status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalReserves = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteFutsalReserves(ids)
    .then(() => {
      dispatch(actions.futsalReservesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete futsalReserves";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
