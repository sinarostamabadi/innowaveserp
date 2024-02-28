import * as requestFromServer from "./restaurantMenuGroupsCrud";
import {
  restaurantMenuGroupsSlice,
  callTypes,
} from "./restaurantMenuGroupsSlice";
const { actions } = restaurantMenuGroupsSlice;
export const fetchRestaurantMenuGroups = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRestaurantMenuGroups(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantMenuGroupsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantMenuGroup = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.restaurantMenuGroupFetched({
        restaurantMenuGroupForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRestaurantMenuGroupById(id)
    .then((response) => {
      const restaurantMenuGroup = response.data;
      dispatch(
        actions.restaurantMenuGroupFetched({
          restaurantMenuGroupForEdit: restaurantMenuGroup,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuGroup = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantMenuGroup(id)
    .then((response) => {
      dispatch(actions.restaurantMenuGroupDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantMenuGroup =
  (restaurantMenuGroupForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createRestaurantMenuGroup(restaurantMenuGroupForCreation)
      .then((response) => {
        const restaurantMenuGroup = response.data;
        dispatch(actions.restaurantMenuGroupCreated(restaurantMenuGroup));
      })
      .catch((error) => {
        error.clientMessage = "Can't create restaurantMenuGroup";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateRestaurantMenuGroup =
  (restaurantMenuGroup) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateRestaurantMenuGroup(restaurantMenuGroup)
      .then((response) => {
        dispatch(actions.restaurantMenuGroupUpdated({ restaurantMenuGroup }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update restaurantMenuGroup";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateRestaurantMenuGroupsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRestaurantMenuGroups(ids, status)
    .then(() => {
      dispatch(actions.restaurantMenuGroupsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuGroups status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuGroups = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantMenuGroups(ids)
    .then(() => {
      dispatch(actions.restaurantMenuGroupsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuGroups";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
