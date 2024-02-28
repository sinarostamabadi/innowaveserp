import * as requestFromServer from "./restaurantCostTypesCrud";
import {
  restaurantCostTypesSlice,
  callTypes,
} from "./restaurantCostTypesSlice";
const { actions } = restaurantCostTypesSlice;
export const fetchRestaurantCostTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRestaurantCostTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantCostTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantCostTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantCostType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.restaurantCostTypeFetched({
        restaurantCostTypeForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRestaurantCostTypeById(id)
    .then((response) => {
      const restaurantCostType = response.data;
      dispatch(
        actions.restaurantCostTypeFetched({
          restaurantCostTypeForEdit: restaurantCostType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantCostType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantCostType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantCostType(id)
    .then((response) => {
      dispatch(actions.restaurantCostTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantCostType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantCostType =
  (restaurantCostTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createRestaurantCostType(restaurantCostTypeForCreation)
      .then((response) => {
        const restaurantCostType = response.data;
        dispatch(actions.restaurantCostTypeCreated(restaurantCostType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create restaurantCostType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateRestaurantCostType = (restaurantCostType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRestaurantCostType(restaurantCostType)
    .then((response) => {
      dispatch(actions.restaurantCostTypeUpdated({ restaurantCostType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurantCostType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantCostTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRestaurantCostTypes(ids, status)
    .then(() => {
      dispatch(actions.restaurantCostTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurantCostTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantCostTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantCostTypes(ids)
    .then(() => {
      dispatch(actions.restaurantCostTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantCostTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
