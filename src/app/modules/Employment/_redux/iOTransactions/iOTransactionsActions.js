import * as requestFromServer from "./iOTransactionsCrud";
import { iOTransactionsSlice, callTypes } from "./iOTransactionsSlice";
const { actions } = iOTransactionsSlice;
export const fetchIOTransactions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findIOTransactions(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.iOTransactionsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find iOTransactions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchIOTransaction = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.iOTransactionFetched({ iOTransactionForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getIOTransactionById(id)
    .then((response) => {
      const iOTransaction = response.data;
      dispatch(
        actions.iOTransactionFetched({ iOTransactionForEdit: iOTransaction })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find iOTransaction";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIOTransaction = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIOTransaction(id)
    .then((response) => {
      dispatch(actions.iOTransactionDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete iOTransaction";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createIOTransaction = (iOTransactionForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createIOTransaction(iOTransactionForCreation)
    .then((response) => {
      const iOTransaction = response.data;
      dispatch(actions.iOTransactionCreated(iOTransaction));
    })
    .catch((error) => {
      error.clientMessage = "Can't create iOTransaction";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateIOTransaction = (iOTransaction) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateIOTransaction(iOTransaction)
    .then((response) => {
      dispatch(actions.iOTransactionUpdated({ iOTransaction }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update iOTransaction";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateIOTransactionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForIOTransactions(ids, status)
    .then(() => {
      dispatch(actions.iOTransactionsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update iOTransactions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIOTransactions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIOTransactions(ids)
    .then(() => {
      dispatch(actions.iOTransactionsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete iOTransactions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
