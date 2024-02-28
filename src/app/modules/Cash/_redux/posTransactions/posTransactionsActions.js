import * as requestFromServer from "./posTransactionsCrud";
import { posTransactionsSlice, callTypes } from "./posTransactionsSlice";
const { actions } = posTransactionsSlice;
export const fetchPosTransactions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPosTransactions(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.posTransactionsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find posTransactions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPosTransaction = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.posTransactionFetched({ posTransactionForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPosTransactionById(id)
    .then((response) => {
      const posTransaction = response.data;
      dispatch(
        actions.posTransactionFetched({ posTransactionForEdit: posTransaction })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find posTransaction";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePosTransaction = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePosTransaction(id)
    .then((response) => {
      dispatch(actions.posTransactionDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete posTransaction";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPosTransaction =
  (posTransactionForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createPosTransaction(posTransactionForCreation)
      .then((response) => {
        const posTransaction = response.data;
        dispatch(actions.posTransactionCreated(posTransaction));
      })
      .catch((error) => {
        error.clientMessage = "Can't create posTransaction";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updatePosTransaction = (posTransaction) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePosTransaction(posTransaction)
    .then((response) => {
      dispatch(actions.posTransactionUpdated({ posTransaction }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update posTransaction";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePosTransactionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPosTransactions(ids, status)
    .then(() => {
      dispatch(actions.posTransactionsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update posTransactions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePosTransactions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePosTransactions(ids)
    .then(() => {
      dispatch(actions.posTransactionsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete posTransactions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
