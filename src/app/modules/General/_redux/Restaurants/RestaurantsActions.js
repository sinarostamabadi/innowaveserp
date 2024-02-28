import * as requestFromServer from "./RestaurantsCrud";
import { restaurantsSlice, callTypes } from "./RestaurantsSlice";
const { actions } = restaurantsSlice;
export const fetchRestaurants = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRestaurants(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurants";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurant = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.restaurantFetched({ restaurantForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRestaurantById(id)
    .then((response) => {
      const restaurant = response.data;
      dispatch(actions.restaurantFetched({ restaurantForEdit: restaurant }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurant";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurant = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurant(id)
    .then((response) => {
      dispatch(actions.restaurantDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurant";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurant = (restaurantForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRestaurant(restaurantForCreation)
    .then((response) => {
      const restaurant = response.data;
      dispatch(actions.restaurantCreated(restaurant));
    })
    .catch((error) => {
      error.clientMessage = "Can't create restaurant";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurant = (restaurant) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRestaurant(restaurant)
    .then((response) => {
      dispatch(actions.restaurantUpdated({ restaurant }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurant";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRestaurants(ids, status)
    .then(() => {
      dispatch(actions.restaurantsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurants status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurants = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurants(ids)
    .then(() => {
      dispatch(actions.restaurantsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurants";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
