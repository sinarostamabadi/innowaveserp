import * as requestFromServer from "./menuItemPricesCrud";
import { menuItemPricesSlice, callTypes } from "./menuItemPricesSlice";
const { actions } = menuItemPricesSlice;
export const fetchMenuItemPrices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMenuItemPrices(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.menuItemPricesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuItemPrices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMenuItemPrice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.menuItemPriceFetched({ menuItemPriceForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMenuItemPriceById(id)
    .then((response) => {
      const menuItemPrice = response.data;
      dispatch(
        actions.menuItemPriceFetched({ menuItemPriceForEdit: menuItemPrice })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuItemPrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuItemPrice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuItemPrice(id)
    .then((response) => {
      dispatch(actions.menuItemPriceDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuItemPrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMenuItemPrice = (menuItemPriceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMenuItemPrice(menuItemPriceForCreation)
    .then((response) => {
      const menuItemPrice = response.data;
      dispatch(actions.menuItemPriceCreated(menuItemPrice));
    })
    .catch((error) => {
      error.clientMessage = "Can't create menuItemPrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuItemPrice = (menuItemPrice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMenuItemPrice(menuItemPrice)
    .then((response) => {
      dispatch(actions.menuItemPriceUpdated({ menuItemPrice }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update menuItemPrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuItemPricesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMenuItemPrices(ids, status)
    .then(() => {
      dispatch(actions.menuItemPricesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update menuItemPrices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuItemPrices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuItemPrices(ids)
    .then(() => {
      dispatch(actions.menuItemPricesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuItemPrices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
