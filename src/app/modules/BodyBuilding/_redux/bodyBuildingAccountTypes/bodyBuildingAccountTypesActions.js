import * as requestFromServer from "./bodyBuildingAccountTypesCrud";
import {
  bodyBuildingAccountTypesSlice,
  callTypes,
} from "./bodyBuildingAccountTypesSlice";
const { actions } = bodyBuildingAccountTypesSlice;
export const fetchBodyBuildingAccountTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBodyBuildingAccountTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bodyBuildingAccountTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingAccountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBodyBuildingAccountType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.bodyBuildingAccountTypeFetched({
        bodyBuildingAccountTypeForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBodyBuildingAccountTypeById(id)
    .then((response) => {
      const bodyBuildingAccountType = response.data;
      dispatch(
        actions.bodyBuildingAccountTypeFetched({
          bodyBuildingAccountTypeForEdit: bodyBuildingAccountType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingAccountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingAccountType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBodyBuildingAccountType(id)
    .then((response) => {
      dispatch(actions.bodyBuildingAccountTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingAccountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBodyBuildingAccountType =
  (bodyBuildingAccountTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createBodyBuildingAccountType(bodyBuildingAccountTypeForCreation)
      .then((response) => {
        const bodyBuildingAccountType = response.data;
        dispatch(
          actions.bodyBuildingAccountTypeCreated(bodyBuildingAccountType)
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't create bodyBuildingAccountType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBodyBuildingAccountType =
  (bodyBuildingAccountType) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateBodyBuildingAccountType(bodyBuildingAccountType)
      .then((response) => {
        dispatch(
          actions.bodyBuildingAccountTypeUpdated({ bodyBuildingAccountType })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update bodyBuildingAccountType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBodyBuildingAccountTypesStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForBodyBuildingAccountTypes(ids, status)
      .then(() => {
        dispatch(
          actions.bodyBuildingAccountTypesStatusUpdated({ ids, status })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update bodyBuildingAccountTypes status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteBodyBuildingAccountTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBodyBuildingAccountTypes(ids)
    .then(() => {
      dispatch(actions.bodyBuildingAccountTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingAccountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
