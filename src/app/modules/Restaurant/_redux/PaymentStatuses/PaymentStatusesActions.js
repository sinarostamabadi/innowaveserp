
import * as requestFromServer from "./paymentStatusesCrud";
import { paymentStatusesSlice, callTypes } from "./paymentStatusesSlice";
const { actions } = paymentStatusesSlice;
export const fetchPaymentStatuses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findPaymentStatuses(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.paymentStatusesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find paymentStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPaymentStatus = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.paymentStatusFetched({ paymentStatusForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPaymentStatusById(id)  
    .then((response) => {
      const paymentStatus = response.data;
      dispatch(actions.paymentStatusFetched({ paymentStatusForEdit: paymentStatus }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find paymentStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePaymentStatus = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePaymentStatus(id)  
    .then((response) => {
      dispatch(actions.paymentStatusDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete paymentStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPaymentStatus = (paymentStatusForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPaymentStatus(paymentStatusForCreation)  
    .then((response) => {
      const paymentStatus = response.data;
      dispatch(actions.paymentStatusCreated(paymentStatus));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create paymentStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePaymentStatus = (paymentStatus) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePaymentStatus(paymentStatus)  
    .then((response) => {
      dispatch(actions.paymentStatusUpdated({ paymentStatus }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update paymentStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePaymentStatusesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForPaymentStatuses(ids, status)  
    .then(() => {
      dispatch(actions.paymentStatusesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update paymentStatuses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePaymentStatuses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePaymentStatuses(ids)  
    .then(() => {
      dispatch(actions.paymentStatusesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete paymentStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 