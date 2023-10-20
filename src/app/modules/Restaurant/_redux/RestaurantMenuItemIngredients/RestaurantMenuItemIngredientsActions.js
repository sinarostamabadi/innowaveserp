
import * as requestFromServer from "./restaurantMenuItemIngredientsCrud";
import { restaurantMenuItemIngredientsSlice, callTypes } from "./restaurantMenuItemIngredientsSlice";
const { actions } = restaurantMenuItemIngredientsSlice;
export const fetchRestaurantMenuItemIngredients = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRestaurantMenuItemIngredients(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantMenuItemIngredientsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItemIngredients";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantMenuItemIngredient = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.restaurantMenuItemIngredientFetched({ restaurantMenuItemIngredientForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRestaurantMenuItemIngredientById(id)  
    .then((response) => {
      const restaurantMenuItemIngredient = response.data;
      dispatch(actions.restaurantMenuItemIngredientFetched({ restaurantMenuItemIngredientForEdit: restaurantMenuItemIngredient }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItemIngredient";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItemIngredient = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantMenuItemIngredient(id)  
    .then((response) => {
      dispatch(actions.restaurantMenuItemIngredientDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItemIngredient";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantMenuItemIngredient = (restaurantMenuItemIngredientForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRestaurantMenuItemIngredient(restaurantMenuItemIngredientForCreation)  
    .then((response) => {
      const restaurantMenuItemIngredient = response.data;
      dispatch(actions.restaurantMenuItemIngredientCreated(restaurantMenuItemIngredient));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create restaurantMenuItemIngredient";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantMenuItemIngredient = (restaurantMenuItemIngredient) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRestaurantMenuItemIngredient(restaurantMenuItemIngredient)  
    .then((response) => {
      dispatch(actions.restaurantMenuItemIngredientUpdated({ restaurantMenuItemIngredient }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuItemIngredient";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantMenuItemIngredientsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRestaurantMenuItemIngredients(ids, status)  
    .then(() => {
      dispatch(actions.restaurantMenuItemIngredientsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuItemIngredients status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItemIngredients = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantMenuItemIngredients(ids)  
    .then(() => {
      dispatch(actions.restaurantMenuItemIngredientsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItemIngredients";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 