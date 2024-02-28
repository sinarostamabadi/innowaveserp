import * as requestFromServer from "./monthlyEmployeeIOsCrud";
import { monthlyEmployeeIOsSlice, callTypes } from "./monthlyEmployeeIOsSlice";
const { actions } = monthlyEmployeeIOsSlice;
export const fetchMonthlyEmployeeIOs = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMonthlyEmployeeIOs(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.monthlyEmployeeIOsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find monthlyEmployeeIOs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMonthlyEmployeeIO = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.monthlyEmployeeIOFetched({ monthlyEmployeeIOForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMonthlyEmployeeIOById(id)
    .then((response) => {
      const monthlyEmployeeIO = response.data;
      dispatch(
        actions.monthlyEmployeeIOFetched({
          monthlyEmployeeIOForEdit: monthlyEmployeeIO,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find monthlyEmployeeIO";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMonthlyEmployeeIO = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMonthlyEmployeeIO(id)
    .then((response) => {
      dispatch(actions.monthlyEmployeeIODeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete monthlyEmployeeIO";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMonthlyEmployeeIO =
  (monthlyEmployeeIOForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createMonthlyEmployeeIO(monthlyEmployeeIOForCreation)
      .then((response) => {
        const monthlyEmployeeIO = response.data;
        dispatch(actions.monthlyEmployeeIOCreated(monthlyEmployeeIO));
      })
      .catch((error) => {
        error.clientMessage = "Can't create monthlyEmployeeIO";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateMonthlyEmployeeIO = (monthlyEmployeeIO) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMonthlyEmployeeIO(monthlyEmployeeIO)
    .then((response) => {
      dispatch(actions.monthlyEmployeeIOUpdated({ monthlyEmployeeIO }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update monthlyEmployeeIO";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMonthlyEmployeeIOsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMonthlyEmployeeIOs(ids, status)
    .then(() => {
      dispatch(actions.monthlyEmployeeIOsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update monthlyEmployeeIOs status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMonthlyEmployeeIOs = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMonthlyEmployeeIOs(ids)
    .then(() => {
      dispatch(actions.monthlyEmployeeIOsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete monthlyEmployeeIOs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
