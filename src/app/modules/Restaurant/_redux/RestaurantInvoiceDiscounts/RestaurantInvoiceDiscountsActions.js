
import * as requestFromServer from "./restaurantInvoiceDiscountsCrud";
import { restaurantInvoiceDiscountsSlice, callTypes } from "./restaurantInvoiceDiscountsSlice";
const { actions } = restaurantInvoiceDiscountsSlice;
export const fetchRestaurantInvoiceDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRestaurantInvoiceDiscounts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantInvoiceDiscountsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantInvoiceDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantInvoiceDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.restaurantInvoiceDiscountFetched({ restaurantInvoiceDiscountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRestaurantInvoiceDiscountById(id)  
    .then((response) => {
      const restaurantInvoiceDiscount = response.data;
      dispatch(actions.restaurantInvoiceDiscountFetched({ restaurantInvoiceDiscountForEdit: restaurantInvoiceDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantInvoiceDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantInvoiceDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantInvoiceDiscount(id)  
    .then((response) => {
      dispatch(actions.restaurantInvoiceDiscountDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantInvoiceDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantInvoiceDiscount = (restaurantInvoiceDiscountForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRestaurantInvoiceDiscount(restaurantInvoiceDiscountForCreation)  
    .then((response) => {
      const restaurantInvoiceDiscount = response.data;
      dispatch(actions.restaurantInvoiceDiscountCreated(restaurantInvoiceDiscount));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create restaurantInvoiceDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantInvoiceDiscount = (restaurantInvoiceDiscount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRestaurantInvoiceDiscount(restaurantInvoiceDiscount)  
    .then((response) => {
      dispatch(actions.restaurantInvoiceDiscountUpdated({ restaurantInvoiceDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantInvoiceDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantInvoiceDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRestaurantInvoiceDiscounts(ids, status)  
    .then(() => {
      dispatch(actions.restaurantInvoiceDiscountsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantInvoiceDiscounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantInvoiceDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantInvoiceDiscounts(ids)  
    .then(() => {
      dispatch(actions.restaurantInvoiceDiscountsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantInvoiceDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 