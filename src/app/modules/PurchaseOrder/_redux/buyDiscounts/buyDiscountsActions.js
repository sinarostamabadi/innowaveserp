
import * as requestFromServer from "./buyDiscountsCrud";
import { buyDiscountsSlice, callTypes } from "./buyDiscountsSlice";
const { actions } = buyDiscountsSlice;
export const fetchBuyDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBuyDiscounts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.buyDiscountsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find buyDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBuyDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.buyDiscountFetched({ buyDiscountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBuyDiscountById(id)  
    .then((response) => {
      const buyDiscount = response.data;
      dispatch(actions.buyDiscountFetched({ buyDiscountForEdit: buyDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find buyDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBuyDiscount(id)  
    .then((response) => {
      dispatch(actions.buyDiscountDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete buyDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBuyDiscount = (buyDiscountForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBuyDiscount(buyDiscountForCreation)  
    .then((response) => {
      const buyDiscount = response.data;
      dispatch(actions.buyDiscountCreated(buyDiscount));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create buyDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyDiscount = (buyDiscount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBuyDiscount(buyDiscount)  
    .then((response) => {
      dispatch(actions.buyDiscountUpdated({ buyDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update buyDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBuyDiscounts(ids, status)  
    .then(() => {
      dispatch(actions.buyDiscountsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update buyDiscounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBuyDiscounts(ids)  
    .then(() => {
      dispatch(actions.buyDiscountsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete buyDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 