
import * as requestFromServer from "./restaurantInvoiceDtlsCrud";
import { restaurantInvoiceDtlsSlice, callTypes } from "./restaurantInvoiceDtlsSlice";
const { actions } = restaurantInvoiceDtlsSlice;
export const fetchRestaurantInvoiceDtls = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRestaurantInvoiceDtls(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantInvoiceDtlsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantInvoiceDtls";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantInvoiceDtl = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.restaurantInvoiceDtlFetched({ restaurantInvoiceDtlForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRestaurantInvoiceDtlById(id)  
    .then((response) => {
      const restaurantInvoiceDtl = response.data;
      dispatch(actions.restaurantInvoiceDtlFetched({ restaurantInvoiceDtlForEdit: restaurantInvoiceDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find restaurantInvoiceDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantInvoiceDtl = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantInvoiceDtl(id)  
    .then((response) => {
      dispatch(actions.restaurantInvoiceDtlDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantInvoiceDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantInvoiceDtl = (restaurantInvoiceDtlForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRestaurantInvoiceDtl(restaurantInvoiceDtlForCreation)  
    .then((response) => {
      const restaurantInvoiceDtl = response.data;
      dispatch(actions.restaurantInvoiceDtlCreated(restaurantInvoiceDtl));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create restaurantInvoiceDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantInvoiceDtl = (restaurantInvoiceDtl) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRestaurantInvoiceDtl(restaurantInvoiceDtl)  
    .then((response) => {
      dispatch(actions.restaurantInvoiceDtlUpdated({ restaurantInvoiceDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantInvoiceDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantInvoiceDtlsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRestaurantInvoiceDtls(ids, status)  
    .then(() => {
      dispatch(actions.restaurantInvoiceDtlsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update restaurantInvoiceDtls status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantInvoiceDtls = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRestaurantInvoiceDtls(ids)  
    .then(() => {
      dispatch(actions.restaurantInvoiceDtlsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantInvoiceDtls";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 