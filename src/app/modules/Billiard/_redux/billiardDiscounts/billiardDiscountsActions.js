
import * as requestFromServer from "./billiardDiscountsCrud";
import { billiardDiscountsSlice, callTypes } from "./billiardDiscountsSlice";
const { actions } = billiardDiscountsSlice;
export const fetchBilliardDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBilliardDiscounts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.billiardDiscountsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find billiardDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBilliardDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.billiardDiscountFetched({ billiardDiscountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBilliardDiscountById(id)  
    .then((response) => {
      const billiardDiscount = response.data;
      dispatch(actions.billiardDiscountFetched({ billiardDiscountForEdit: billiardDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find billiardDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBilliardDiscount(id)  
    .then((response) => {
      dispatch(actions.billiardDiscountDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete billiardDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBilliardDiscount = (billiardDiscountForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBilliardDiscount(billiardDiscountForCreation)  
    .then((response) => {
      const billiardDiscount = response.data;
      dispatch(actions.billiardDiscountCreated(billiardDiscount));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create billiardDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBilliardDiscount = (billiardDiscount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBilliardDiscount(billiardDiscount)  
    .then((response) => {
      dispatch(actions.billiardDiscountUpdated({ billiardDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update billiardDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBilliardDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBilliardDiscounts(ids, status)  
    .then(() => {
      dispatch(actions.billiardDiscountsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update billiardDiscounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBilliardDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBilliardDiscounts(ids)  
    .then(() => {
      dispatch(actions.billiardDiscountsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete billiardDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};