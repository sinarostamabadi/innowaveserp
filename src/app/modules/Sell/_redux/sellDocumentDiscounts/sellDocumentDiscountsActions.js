
import * as requestFromServer from "./sellDocumentDiscountsCrud";
import { sellDocumentDiscountsSlice, callTypes } from "./sellDocumentDiscountsSlice";
const { actions } = sellDocumentDiscountsSlice;
export const fetchSellDocumentDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellDocumentDiscounts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellDocumentDiscountsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocumentDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellDocumentDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellDocumentDiscountFetched({ sellDocumentDiscountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellDocumentDiscountById(id)  
    .then((response) => {
      const sellDocumentDiscount = response.data;
      dispatch(actions.sellDocumentDiscountFetched({ sellDocumentDiscountForEdit: sellDocumentDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocumentDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocumentDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocumentDiscount(id)  
    .then((response) => {
      dispatch(actions.sellDocumentDiscountDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocumentDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellDocumentDiscount = (sellDocumentDiscountForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellDocumentDiscount(sellDocumentDiscountForCreation)  
    .then((response) => {
      const sellDocumentDiscount = response.data;
      dispatch(actions.sellDocumentDiscountCreated(sellDocumentDiscount));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellDocumentDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocumentDiscount = (sellDocumentDiscount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellDocumentDiscount(sellDocumentDiscount)  
    .then((response) => {
      dispatch(actions.sellDocumentDiscountUpdated({ sellDocumentDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocumentDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocumentDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellDocumentDiscounts(ids, status)  
    .then(() => {
      dispatch(actions.sellDocumentDiscountsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocumentDiscounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocumentDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocumentDiscounts(ids)  
    .then(() => {
      dispatch(actions.sellDocumentDiscountsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocumentDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 