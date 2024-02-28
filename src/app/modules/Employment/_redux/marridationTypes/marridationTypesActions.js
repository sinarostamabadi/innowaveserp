import * as requestFromServer from "./marridationTypesCrud";
import { marridationTypesSlice, callTypes } from "./marridationTypesSlice";
const { actions } = marridationTypesSlice;
export const fetchMarridationTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMarridationTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.marridationTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find marridationTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMarridationType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.marridationTypeFetched({ marridationTypeForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMarridationTypeById(id)
    .then((response) => {
      const marridationType = response.data;
      dispatch(
        actions.marridationTypeFetched({
          marridationTypeForEdit: marridationType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find marridationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMarridationType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMarridationType(id)
    .then((response) => {
      dispatch(actions.marridationTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete marridationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMarridationType =
  (marridationTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createMarridationType(marridationTypeForCreation)
      .then((response) => {
        const marridationType = response.data;
        dispatch(actions.marridationTypeCreated(marridationType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create marridationType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateMarridationType = (marridationType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMarridationType(marridationType)
    .then((response) => {
      dispatch(actions.marridationTypeUpdated({ marridationType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update marridationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMarridationTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMarridationTypes(ids, status)
    .then(() => {
      dispatch(actions.marridationTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update marridationTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMarridationTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMarridationTypes(ids)
    .then(() => {
      dispatch(actions.marridationTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete marridationTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
