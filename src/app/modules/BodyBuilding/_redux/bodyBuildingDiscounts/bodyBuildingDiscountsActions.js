
import * as requestFromServer from "./bodyBuildingDiscountsCrud";
import { bodyBuildingDiscountsSlice, callTypes } from "./bodyBuildingDiscountsSlice";
const { actions } = bodyBuildingDiscountsSlice;
export const fetchBodyBuildingDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBodyBuildingDiscounts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bodyBuildingDiscountsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBodyBuildingDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bodyBuildingDiscountFetched({ bodyBuildingDiscountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBodyBuildingDiscountById(id)  
    .then((response) => {
      const bodyBuildingDiscount = response.data;
      dispatch(actions.bodyBuildingDiscountFetched({ bodyBuildingDiscountForEdit: bodyBuildingDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBodyBuildingDiscount(id)  
    .then((response) => {
      dispatch(actions.bodyBuildingDiscountDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBodyBuildingDiscount = (bodyBuildingDiscountForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBodyBuildingDiscount(bodyBuildingDiscountForCreation)  
    .then((response) => {
      const bodyBuildingDiscount = response.data;
      dispatch(actions.bodyBuildingDiscountCreated(bodyBuildingDiscount));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create bodyBuildingDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBodyBuildingDiscount = (bodyBuildingDiscount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBodyBuildingDiscount(bodyBuildingDiscount)  
    .then((response) => {
      dispatch(actions.bodyBuildingDiscountUpdated({ bodyBuildingDiscount }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bodyBuildingDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBodyBuildingDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBodyBuildingDiscounts(ids, status)  
    .then(() => {
      dispatch(actions.bodyBuildingDiscountsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update bodyBuildingDiscounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBodyBuildingDiscounts(ids)  
    .then(() => {
      dispatch(actions.bodyBuildingDiscountsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};