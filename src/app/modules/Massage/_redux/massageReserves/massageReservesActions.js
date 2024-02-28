import * as requestFromServer from "./massageReservesCrud";
import { massageReservesSlice, callTypes } from "./massageReservesSlice";
const { actions } = massageReservesSlice;
export const fetchMassageReserves = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMassageReserves(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.massageReservesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find massageReserves";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMassageReserve = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.massageReserveFetched({ massageReserveForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMassageReserveById(id)
    .then((response) => {
      const massageReserve = response.data;
      dispatch(
        actions.massageReserveFetched({ massageReserveForEdit: massageReserve })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find massageReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageReserve = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMassageReserve(id)
    .then((response) => {
      dispatch(actions.massageReserveDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete massageReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMassageReserve =
  (massageReserveForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createMassageReserve(massageReserveForCreation)
      .then((response) => {
        const massageReserve = response.data;
        dispatch(actions.massageReserveCreated(massageReserve));
      })
      .catch((error) => {
        error.clientMessage = "Can't create massageReserve";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateMassageReserve = (massageReserve) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMassageReserve(massageReserve)
    .then((response) => {
      dispatch(actions.massageReserveUpdated({ massageReserve }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update massageReserve";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMassageReservesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMassageReserves(ids, status)
    .then(() => {
      dispatch(actions.massageReservesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update massageReserves status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageReserves = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMassageReserves(ids)
    .then(() => {
      dispatch(actions.massageReservesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete massageReserves";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
