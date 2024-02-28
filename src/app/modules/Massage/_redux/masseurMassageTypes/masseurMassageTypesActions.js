import * as requestFromServer from "./masseurMassageTypesCrud";
import {
  masseurMassageTypesSlice,
  callTypes,
} from "./masseurMassageTypesSlice";
const { actions } = masseurMassageTypesSlice;
export const fetchMasseurMassageTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMasseurMassageTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.masseurMassageTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find masseurMassageTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMasseurMassageType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.masseurMassageTypeFetched({
        masseurMassageTypeForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMasseurMassageTypeById(id)
    .then((response) => {
      const masseurMassageType = response.data;
      dispatch(
        actions.masseurMassageTypeFetched({
          masseurMassageTypeForEdit: masseurMassageType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find masseurMassageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMasseurMassageType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMasseurMassageType(id)
    .then((response) => {
      dispatch(actions.masseurMassageTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete masseurMassageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMasseurMassageType =
  (masseurMassageTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createMasseurMassageType(masseurMassageTypeForCreation)
      .then((response) => {
        const masseurMassageType = response.data;
        dispatch(actions.masseurMassageTypeCreated(masseurMassageType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create masseurMassageType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateMasseurMassageType = (masseurMassageType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMasseurMassageType(masseurMassageType)
    .then((response) => {
      dispatch(actions.masseurMassageTypeUpdated({ masseurMassageType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update masseurMassageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMasseurMassageTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMasseurMassageTypes(ids, status)
    .then(() => {
      dispatch(actions.masseurMassageTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update masseurMassageTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMasseurMassageTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMasseurMassageTypes(ids)
    .then(() => {
      dispatch(actions.masseurMassageTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete masseurMassageTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
