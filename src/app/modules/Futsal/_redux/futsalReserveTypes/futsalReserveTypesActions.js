import * as requestFromServer from "./futsalReserveTypesCrud";
import { futsalReserveTypesSlice, callTypes } from "./futsalReserveTypesSlice";
const { actions } = futsalReserveTypesSlice;
export const fetchFutsalReserveTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findFutsalReserveTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.futsalReserveTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find futsalReserveTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchFutsalReserveType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.futsalReserveTypeFetched({ futsalReserveTypeForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getFutsalReserveTypeById(id)
    .then((response) => {
      const futsalReserveType = response.data;
      dispatch(
        actions.futsalReserveTypeFetched({
          futsalReserveTypeForEdit: futsalReserveType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find futsalReserveType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalReserveType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteFutsalReserveType(id)
    .then((response) => {
      dispatch(actions.futsalReserveTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete futsalReserveType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createFutsalReserveType =
  (futsalReserveTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createFutsalReserveType(futsalReserveTypeForCreation)
      .then((response) => {
        const futsalReserveType = response.data;
        dispatch(actions.futsalReserveTypeCreated(futsalReserveType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create futsalReserveType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateFutsalReserveType = (futsalReserveType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateFutsalReserveType(futsalReserveType)
    .then((response) => {
      dispatch(actions.futsalReserveTypeUpdated({ futsalReserveType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update futsalReserveType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalReserveTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForFutsalReserveTypes(ids, status)
    .then(() => {
      dispatch(actions.futsalReserveTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update futsalReserveTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalReserveTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteFutsalReserveTypes(ids)
    .then(() => {
      dispatch(actions.futsalReserveTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete futsalReserveTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
