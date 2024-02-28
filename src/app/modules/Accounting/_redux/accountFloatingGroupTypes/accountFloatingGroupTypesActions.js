import * as requestFromServer from "./accountFloatingGroupTypesCrud";
import {
  accountFloatingGroupTypesSlice,
  callTypes,
} from "./accountFloatingGroupTypesSlice";
const { actions } = accountFloatingGroupTypesSlice;
export const fetchAccountFloatingGroupTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAccountFloatingGroupTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.accountFloatingGroupTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find accountFloatingGroupTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAccountFloatingGroupType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.accountFloatingGroupTypeFetched({
        accountFloatingGroupTypeForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAccountFloatingGroupTypeById(id)
    .then((response) => {
      const accountFloatingGroupType = response.data;
      dispatch(
        actions.accountFloatingGroupTypeFetched({
          accountFloatingGroupTypeForEdit: accountFloatingGroupType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find accountFloatingGroupType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAccountFloatingGroupType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAccountFloatingGroupType(id)
    .then((response) => {
      dispatch(actions.accountFloatingGroupTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloatingGroupType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createAccountFloatingGroupType =
  (accountFloatingGroupTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createAccountFloatingGroupType(accountFloatingGroupTypeForCreation)
      .then((response) => {
        const accountFloatingGroupType = response.data;
        dispatch(
          actions.accountFloatingGroupTypeCreated(accountFloatingGroupType)
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't create accountFloatingGroupType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateAccountFloatingGroupType =
  (id, accountFloatingGroupType) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateAccountFloatingGroupType(id, accountFloatingGroupType)
      .then((response) => {
        dispatch(
          actions.accountFloatingGroupTypeUpdated({ accountFloatingGroupType })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update accountFloatingGroupType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateAccountFloatingGroupTypesStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForAccountFloatingGroupTypes(ids, status)
      .then(() => {
        dispatch(
          actions.accountFloatingGroupTypesStatusUpdated({ ids, status })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update accountFloatingGroupTypes status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteAccountFloatingGroupTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAccountFloatingGroupTypes(ids)
    .then(() => {
      dispatch(actions.accountFloatingGroupTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete accountFloatingGroupTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
