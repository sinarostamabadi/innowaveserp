
import * as requestFromServer from "./futsalDiscountsCrud";
import { futsalDiscountsSlice, callTypes } from "./futsalDiscountsSlice";
const { actions } = futsalDiscountsSlice;
export const fetchFutsalDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findFutsalDiscounts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.futsalDiscountsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchFutsalDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.futsalDiscountFetched({ futsalDiscountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getFutsalDiscountById(id)  
    .then((response) => {
      const futsalDiscount = response.data;
      dispatch(actions.futsalDiscountFetched({ futsalDiscountForEdit: futsalDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalDiscount(id)  
    .then((response) => {
      dispatch(actions.futsalDiscountDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createFutsalDiscount = (futsalDiscountForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createFutsalDiscount(futsalDiscountForCreation)  
    .then((response) => {
      const futsalDiscount = response.data;
      dispatch(actions.futsalDiscountCreated(futsalDiscount));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create futsalDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalDiscount = (futsalDiscount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateFutsalDiscount(futsalDiscount)  
    .then((response) => {
      dispatch(actions.futsalDiscountUpdated({ futsalDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForFutsalDiscounts(ids, status)  
    .then(() => {
      dispatch(actions.futsalDiscountsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalDiscounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalDiscounts(ids)  
    .then(() => {
      dispatch(actions.futsalDiscountsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 