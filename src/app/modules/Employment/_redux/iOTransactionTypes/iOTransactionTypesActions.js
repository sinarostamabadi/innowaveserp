import * as requestFromServer from "./iOTransactionTypesCrud";
import { iOTransactionTypesSlice, callTypes } from "./iOTransactionTypesSlice";
const { actions } = iOTransactionTypesSlice;
export const fetchIOTransactionTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findIOTransactionTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.iOTransactionTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find iOTransactionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchIOTransactionType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.iOTransactionTypeFetched({ iOTransactionTypeForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getIOTransactionTypeById(id)
    .then((response) => {
      const iOTransactionType = response.data;
      dispatch(
        actions.iOTransactionTypeFetched({
          iOTransactionTypeForEdit: iOTransactionType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find iOTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIOTransactionType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIOTransactionType(id)
    .then((response) => {
      dispatch(actions.iOTransactionTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete iOTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createIOTransactionType =
  (iOTransactionTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createIOTransactionType(iOTransactionTypeForCreation)
      .then((response) => {
        const iOTransactionType = response.data;
        dispatch(actions.iOTransactionTypeCreated(iOTransactionType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create iOTransactionType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateIOTransactionType = (iOTransactionType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateIOTransactionType(iOTransactionType)
    .then((response) => {
      dispatch(actions.iOTransactionTypeUpdated({ iOTransactionType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update iOTransactionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateIOTransactionTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForIOTransactionTypes(ids, status)
    .then(() => {
      dispatch(actions.iOTransactionTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update iOTransactionTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteIOTransactionTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIOTransactionTypes(ids)
    .then(() => {
      dispatch(actions.iOTransactionTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete iOTransactionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
