
import * as requestFromServer from "./paymentsCrud";
import { paymentsSlice, callTypes } from "./paymentsSlice";
const { actions } = paymentsSlice;
export const fetchPayments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findPayments(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.paymentsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find payments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPayment = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.paymentFetched({ paymentForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPaymentById(id)  
    .then((response) => {
      const payment = response.data;
      dispatch(actions.paymentFetched({ paymentForEdit: payment }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePayment = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePayment(id)  
    .then((response) => {
      dispatch(actions.paymentDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPayment = (paymentForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPayment(paymentForCreation)  
    .then((response) => {
      const payment = response.data;
      dispatch(actions.paymentCreated(payment));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePayment = (payment) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePayment(payment)  
    .then((response) => {
      dispatch(actions.paymentUpdated({ payment }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update payment";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePaymentsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForPayments(ids, status)  
    .then(() => {
      dispatch(actions.paymentsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update payments status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePayments = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePayments(ids)  
    .then(() => {
      dispatch(actions.paymentsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete payments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};