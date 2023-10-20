
import * as requestFromServer from "./unitMeasureGroupsCrud";
import { unitMeasureGroupsSlice, callTypes } from "./unitMeasureGroupsSlice";
const { actions } = unitMeasureGroupsSlice;
export const fetchUnitMeasureGroups = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUnitMeasureGroups(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.unitMeasureGroupsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find unitMeasureGroups";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchUnitMeasureGroup = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.unitMeasureGroupFetched({ unitMeasureGroupForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUnitMeasureGroupById(id)
    .then((response) => {
      const unitMeasureGroup = response.data;
      dispatch(actions.unitMeasureGroupFetched({ unitMeasureGroupForEdit: unitMeasureGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find unitMeasureGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUnitMeasureGroup = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUnitMeasureGroup(id)
    .then((response) => {
      dispatch(actions.unitMeasureGroupDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete unitMeasureGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createUnitMeasureGroup = (unitMeasureGroupForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUnitMeasureGroup(unitMeasureGroupForCreation)
    .then((response) => {
      const unitMeasureGroup = response.data;
      dispatch(actions.unitMeasureGroupCreated(unitMeasureGroup));
    })
    .catch((error) => {
      error.clientMessage = "Can't create unitMeasureGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUnitMeasureGroup = (id, unitMeasureGroup) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUnitMeasureGroup(id, unitMeasureGroup)
    .then((response) => {
      dispatch(actions.unitMeasureGroupUpdated({ unitMeasureGroup }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update unitMeasureGroup";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUnitMeasureGroupsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUnitMeasureGroups(ids, status)
    .then(() => {
      dispatch(actions.unitMeasureGroupsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update unitMeasureGroups status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUnitMeasureGroups = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUnitMeasureGroups(ids)
    .then(() => {
      dispatch(actions.unitMeasureGroupsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete unitMeasureGroups";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 