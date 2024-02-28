import * as requestFromServer from "./menuItemRatesCrud";
import { menuItemRatesSlice, callTypes } from "./menuItemRatesSlice";
const { actions } = menuItemRatesSlice;
export const fetchMenuItemRates = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMenuItemRates(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.menuItemRatesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuItemRates";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMenuItemRate = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.menuItemRateFetched({ menuItemRateForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMenuItemRateById(id)
    .then((response) => {
      const menuItemRate = response.data;
      dispatch(
        actions.menuItemRateFetched({ menuItemRateForEdit: menuItemRate })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuItemRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuItemRate = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuItemRate(id)
    .then((response) => {
      dispatch(actions.menuItemRateDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuItemRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMenuItemRate = (menuItemRateForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMenuItemRate(menuItemRateForCreation)
    .then((response) => {
      const menuItemRate = response.data;
      dispatch(actions.menuItemRateCreated(menuItemRate));
    })
    .catch((error) => {
      error.clientMessage = "Can't create menuItemRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuItemRate = (menuItemRate) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMenuItemRate(menuItemRate)
    .then((response) => {
      dispatch(actions.menuItemRateUpdated({ menuItemRate }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update menuItemRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuItemRatesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMenuItemRates(ids, status)
    .then(() => {
      dispatch(actions.menuItemRatesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update menuItemRates status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuItemRates = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuItemRates(ids)
    .then(() => {
      dispatch(actions.menuItemRatesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuItemRates";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
