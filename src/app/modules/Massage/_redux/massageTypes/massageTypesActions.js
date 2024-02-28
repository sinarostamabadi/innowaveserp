import * as requestFromServer from "./massageTypesCrud";
import { massageTypesSlice, callTypes } from "./massageTypesSlice";
const { actions } = massageTypesSlice;
export const fetchMassageTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMassageTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.massageTypesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find massageTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMassageType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.massageTypeFetched({ massageTypeForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMassageTypeById(id)
    .then((response) => {
      const massageType = response.data;
      dispatch(actions.massageTypeFetched({ massageTypeForEdit: massageType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find massageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMassageType(id)
    .then((response) => {
      dispatch(actions.massageTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete massageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMassageType = (massageTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMassageType(massageTypeForCreation)
    .then((response) => {
      const massageType = response.data;
      dispatch(actions.massageTypeCreated(massageType));
    })
    .catch((error) => {
      error.clientMessage = "Can't create massageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMassageType = (massageType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMassageType(massageType)
    .then((response) => {
      dispatch(actions.massageTypeUpdated({ massageType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update massageType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMassageTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMassageTypes(ids, status)
    .then(() => {
      dispatch(actions.massageTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update massageTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMassageTypes(ids)
    .then(() => {
      dispatch(actions.massageTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete massageTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
