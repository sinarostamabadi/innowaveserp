
import * as requestFromServer from "./DiscountsCrud";
import { bodyBuildingDiscountsSlice, callTypes } from "./DiscountsSlice";
const { actions } = bodyBuildingDiscountsSlice;
export const fetchDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDiscounts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.discountsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find discounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.discountFetched({ discountForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDiscountById(id)
    .then((response) => {
      const discount = response.data;
      dispatch(actions.discountFetched({ discountForEdit: discount }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find discount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDiscount(id)
    .then((response) => {
      dispatch(actions.discountDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete discount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createDiscount = (discountForCreation, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDiscount(discountForCreation)
    .then((response) => {
      const discount = response.data;
      fnCallBack(discount);
      
      dispatch(actions.discountCreated(discount));

      return discount;
    })
    .catch((error) => {
      error.clientMessage = "Can't create discount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDiscount = (id, discount, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDiscount(id, discount)
    .then((response) => {
      fnCallBack(discount);

      dispatch(actions.discountUpdated({ discount }));

      return discount;
    })
    .catch((error) => {
      error.clientMessage = "Can't update discount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDiscounts(ids, status)
    .then(() => {
      dispatch(actions.discountsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update discounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDiscounts(ids)
    .then(() => {
      dispatch(actions.discountsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete discounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 