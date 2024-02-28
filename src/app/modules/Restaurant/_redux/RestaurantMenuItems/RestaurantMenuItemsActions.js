import * as requestFromServer from "./RestaurantMenuItemsCrud";
import {
  restaurantMenuItemsSlice,
  callTypes,
} from "./RestaurantMenuItemsSlice";
const { actions } = restaurantMenuItemsSlice;
export const fetchRestaurantMenuItems = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRestaurantMenuItems(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantMenuItemsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItems";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantMenuItem = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.restaurantMenuItemFetched({
        restaurantMenuItemForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRestaurantMenuItemById(id)
    .then((response) => {
      const restaurantMenuItem = response.data;
      dispatch(
        actions.restaurantMenuItemFetched({
          restaurantMenuItemForEdit: restaurantMenuItem,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItem = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantMenuItem(id)
    .then((response) => {
      dispatch(actions.restaurantMenuItemDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantMenuItem =
  (restaurantMenuItemForCreation, fnCallBack) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createRestaurantMenuItem(restaurantMenuItemForCreation)
      .then((response) => {
        const restaurantMenuItem = response.data;
        fnCallBack(restaurantMenuItem);

        dispatch(actions.restaurantMenuItemCreated(restaurantMenuItem));

        return restaurantMenuItem;
      })
      .catch((error) => {
        error.clientMessage = "Can't create restaurantMenuItem";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateRestaurantMenuItem =
  (id, restaurantMenuItem, fnCallBack) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateRestaurantMenuItem(id, restaurantMenuItem)
      .then((response) => {
        fnCallBack(restaurantMenuItem);

        dispatch(actions.restaurantMenuItemUpdated({ restaurantMenuItem }));

        return restaurantMenuItem;
      })
      .catch((error) => {
        error.clientMessage = "Can't update restaurantMenuItem";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateRestaurantMenuItemsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRestaurantMenuItems(ids, status)
    .then(() => {
      dispatch(actions.restaurantMenuItemsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuItems status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItems = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantMenuItems(ids)
    .then(() => {
      dispatch(actions.restaurantMenuItemsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItems";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
