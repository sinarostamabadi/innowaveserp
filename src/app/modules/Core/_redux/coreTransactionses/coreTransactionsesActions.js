import * as requestFromServer from "./coreTransactionsesCrud";
import { coreTransactionsesSlice, callTypes } from "./coreTransactionsesSlice";
const { actions } = coreTransactionsesSlice;
export const fetchCoreTransactionses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCoreTransactionses(queryParams)
    .then((response) => {
      const { items, totalCount } = response.data;
      dispatch(
        actions.coreTransactionsesFetched({
          totalCount: totalCount,
          entities: items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coreTransactionses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoreTransactions = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.coreTransactionsFetched({ coreTransactionsForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCoreTransactionsById(id)
    .then((response) => {
      const coreTransactions = response.data;
      dispatch(
        actions.coreTransactionsFetched({
          coreTransactionsForEdit: coreTransactions,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coreTransactions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoreTransactions = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoreTransactions(id)
    .then((response) => {
      dispatch(actions.coreTransactionsDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coreTransactions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createCoreTransactions =
  (coreTransactionsForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createCoreTransactions(coreTransactionsForCreation)
      .then((response) => {
        const coreTransactions = response.data;
        dispatch(actions.coreTransactionsCreated(coreTransactions));
      })
      .catch((error) => {
        error.clientMessage = "Can't create coreTransactions";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const updateCoreTransactions = (coreTransactions) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCoreTransactions(coreTransactions)
    .then((response) => {
      console.log("response =>", response);
      dispatch(actions.coreTransactionsUpdated({ coreTransactions }));
    })
    .catch((error) => {
      console.log("error =>", error);
      error.clientMessage = "Can't update coreTransactions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCoreTransactionsesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCoreTransactionses(ids, status)
    .then(() => {
      dispatch(actions.coreTransactionsesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update coreTransactionses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoreTransactionses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoreTransactionses(ids)
    .then(() => {
      dispatch(actions.coreTransactionsesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coreTransactionses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
