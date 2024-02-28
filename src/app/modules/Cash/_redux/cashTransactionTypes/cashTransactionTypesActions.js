import * as requestFromServer from "./cashTransactionTypesCrud";
import {
  cashTransactionTypesSlice,
  callTypes,
} from "./cashTransactionTypesSlice";
const { actions } = cashTransactionTypesSlice;
export const fetchCashTransactionTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCashTransactionTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.cashTransactionTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find cashTransactionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCashTransactionType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.cashTransactionTypeFetched({
        cashTransactionTypeForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCashTransactionTypeById(id)
    .then((response) => {
      const cashTransactionType = response.data;
      dispatch(
        actions.cashTransactionTypeFetched({
          cashTransactionTypeForEdit: cashTransactionType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find cashTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCashTransactionType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCashTransactionType(id)
    .then((response) => {
      dispatch(actions.cashTransactionTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cashTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCashTransactionType =
  (cashTransactionTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createCashTransactionType(cashTransactionTypeForCreation)
      .then((response) => {
        const cashTransactionType = response.data;
        dispatch(actions.cashTransactionTypeCreated(cashTransactionType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create cashTransactionType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateCashTransactionType =
  (cashTransactionType) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateCashTransactionType(cashTransactionType)
      .then((response) => {
        dispatch(actions.cashTransactionTypeUpdated({ cashTransactionType }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update cashTransactionType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateCashTransactionTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCashTransactionTypes(ids, status)
    .then(() => {
      dispatch(actions.cashTransactionTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cashTransactionTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCashTransactionTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCashTransactionTypes(ids)
    .then(() => {
      dispatch(actions.cashTransactionTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cashTransactionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
