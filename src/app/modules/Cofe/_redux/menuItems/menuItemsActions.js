import * as requestFromServer from "./menuItemsCrud";
import { menuItemsSlice, callTypes } from "./menuItemsSlice";
const { actions } = menuItemsSlice;
export const fetchMenuItems = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMenuItems(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.menuItemsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuItems";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMenuItem = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.menuItemFetched({ menuItemForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMenuItemById(id)
    .then((response) => {
      const menuItem = response.data;
      dispatch(actions.menuItemFetched({ menuItemForEdit: menuItem }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find menuItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuItem = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuItem(id)
    .then((response) => {
      dispatch(actions.menuItemDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMenuItem = (menuItemForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMenuItem(menuItemForCreation)
    .then((response) => {
      const menuItem = response.data;
      dispatch(actions.menuItemCreated(menuItem));
    })
    .catch((error) => {
      error.clientMessage = "Can't create menuItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuItem = (menuItem) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMenuItem(menuItem)
    .then((response) => {
      dispatch(actions.menuItemUpdated({ menuItem }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update menuItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMenuItemsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMenuItems(ids, status)
    .then(() => {
      dispatch(actions.menuItemsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update menuItems status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMenuItems = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMenuItems(ids)
    .then(() => {
      dispatch(actions.menuItemsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete menuItems";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
