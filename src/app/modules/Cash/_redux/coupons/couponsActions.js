
import * as requestFromServer from "./couponsCrud";
import { couponsSlice, callTypes } from "./couponsSlice";
const { actions } = couponsSlice;
export const fetchCoupons = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .find(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.couponsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coupons";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoupon = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.couponFetched({ couponForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getById(id)  
    .then((response) => {
      const coupon = response.data;
      dispatch(actions.couponFetched({ couponForEdit: coupon }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coupon";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const remove = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .remove(id)  
    .then((response) => {
      dispatch(actions.couponDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coupon";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const create = (couponForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .create(couponForCreation)  
    .then((response) => {
      const coupon = response.data;
      dispatch(actions.couponCreated(coupon));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create coupon";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const update = (id, coupon) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .update(id, coupon)  
    .then((response) => {
      dispatch(actions.couponUpdated({ coupon }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coupon";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const removeIds = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .removeIds(ids)  
    .then(() => {
      dispatch(actions.couponsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coupons";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 