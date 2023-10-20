
import * as requestFromServer from "./restaurantMenuItemRatesCrud";
import { restaurantMenuItemRatesSlice, callTypes } from "./restaurantMenuItemRatesSlice";
const { actions } = restaurantMenuItemRatesSlice;
export const fetchRestaurantMenuItemRates = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRestaurantMenuItemRates(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantMenuItemRatesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItemRates";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantMenuItemRate = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.restaurantMenuItemRateFetched({ restaurantMenuItemRateForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRestaurantMenuItemRateById(id)  
    .then((response) => {
      const restaurantMenuItemRate = response.data;
      dispatch(actions.restaurantMenuItemRateFetched({ restaurantMenuItemRateForEdit: restaurantMenuItemRate }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantMenuItemRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItemRate = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantMenuItemRate(id)  
    .then((response) => {
      dispatch(actions.restaurantMenuItemRateDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItemRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantMenuItemRate = (restaurantMenuItemRateForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRestaurantMenuItemRate(restaurantMenuItemRateForCreation)  
    .then((response) => {
      const restaurantMenuItemRate = response.data;
      dispatch(actions.restaurantMenuItemRateCreated(restaurantMenuItemRate));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create restaurantMenuItemRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantMenuItemRate = (restaurantMenuItemRate) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRestaurantMenuItemRate(restaurantMenuItemRate)  
    .then((response) => {
      dispatch(actions.restaurantMenuItemRateUpdated({ restaurantMenuItemRate }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuItemRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantMenuItemRatesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRestaurantMenuItemRates(ids, status)  
    .then(() => {
      dispatch(actions.restaurantMenuItemRatesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantMenuItemRates status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantMenuItemRates = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantMenuItemRates(ids)  
    .then(() => {
      dispatch(actions.restaurantMenuItemRatesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantMenuItemRates";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 