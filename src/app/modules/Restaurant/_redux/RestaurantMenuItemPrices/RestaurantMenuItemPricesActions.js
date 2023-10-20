
import * as requestFromServer from "./restaurantMenuItemPricesCrud";
import { restaurantMenuItemPricesSlice, callTypes } from "./restaurantMenuItemPricesSlice";
const { actions } = restaurantMenuItemPricesSlice;
export const fetchRestaurantMenuItemPrices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRestaurantMenuItemPrices(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantMenuItemPricesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItemPrices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantMenuItemPrice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.restaurantMenuItemPriceFetched({ restaurantMenuItemPriceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRestaurantMenuItemPriceById(id)  
    .then((response) => {
      const restaurantMenuItemPrice = response.data;
      dispatch(actions.restaurantMenuItemPriceFetched({ restaurantMenuItemPriceForEdit: restaurantMenuItemPrice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItemPrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItemPrice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantMenuItemPrice(id)  
    .then((response) => {
      dispatch(actions.restaurantMenuItemPriceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItemPrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantMenuItemPrice = (restaurantMenuItemPriceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRestaurantMenuItemPrice(restaurantMenuItemPriceForCreation)  
    .then((response) => {
      const restaurantMenuItemPrice = response.data;
      dispatch(actions.restaurantMenuItemPriceCreated(restaurantMenuItemPrice));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create restaurantMenuItemPrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantMenuItemPrice = (restaurantMenuItemPrice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRestaurantMenuItemPrice(restaurantMenuItemPrice)  
    .then((response) => {
      dispatch(actions.restaurantMenuItemPriceUpdated({ restaurantMenuItemPrice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuItemPrice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantMenuItemPricesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRestaurantMenuItemPrices(ids, status)  
    .then(() => {
      dispatch(actions.restaurantMenuItemPricesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuItemPrices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItemPrices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantMenuItemPrices(ids)  
    .then(() => {
      dispatch(actions.restaurantMenuItemPricesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItemPrices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 