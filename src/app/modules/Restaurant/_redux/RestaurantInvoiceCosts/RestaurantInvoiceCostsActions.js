
import * as requestFromServer from "./restaurantInvoiceCostsCrud";
import { restaurantInvoiceCostsSlice, callTypes } from "./restaurantInvoiceCostsSlice";
const { actions } = restaurantInvoiceCostsSlice;
export const fetchRestaurantInvoiceCosts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRestaurantInvoiceCosts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantInvoiceCostsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantInvoiceCosts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantInvoiceCost = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.restaurantInvoiceCostFetched({ restaurantInvoiceCostForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRestaurantInvoiceCostById(id)  
    .then((response) => {
      const restaurantInvoiceCost = response.data;
      dispatch(actions.restaurantInvoiceCostFetched({ restaurantInvoiceCostForEdit: restaurantInvoiceCost }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantInvoiceCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantInvoiceCost = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantInvoiceCost(id)  
    .then((response) => {
      dispatch(actions.restaurantInvoiceCostDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantInvoiceCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantInvoiceCost = (restaurantInvoiceCostForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRestaurantInvoiceCost(restaurantInvoiceCostForCreation)  
    .then((response) => {
      const restaurantInvoiceCost = response.data;
      dispatch(actions.restaurantInvoiceCostCreated(restaurantInvoiceCost));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create restaurantInvoiceCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantInvoiceCost = (restaurantInvoiceCost) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRestaurantInvoiceCost(restaurantInvoiceCost)  
    .then((response) => {
      dispatch(actions.restaurantInvoiceCostUpdated({ restaurantInvoiceCost }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantInvoiceCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantInvoiceCostsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRestaurantInvoiceCosts(ids, status)  
    .then(() => {
      dispatch(actions.restaurantInvoiceCostsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantInvoiceCosts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantInvoiceCosts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantInvoiceCosts(ids)  
    .then(() => {
      dispatch(actions.restaurantInvoiceCostsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantInvoiceCosts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 