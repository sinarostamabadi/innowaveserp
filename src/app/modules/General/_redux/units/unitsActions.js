
import * as requestFromServer from "./unitsCrud";
import { unitsSlice, callTypes } from "./unitsSlice";
const { actions } = unitsSlice;
export const fetchUnits = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUnits(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.unitsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find units";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchUnit = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.unitFetched({ unitForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUnitById(id)
    .then((response) => {
      const unit = response.data;
      dispatch(actions.unitFetched({ unitForEdit: unit }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find unit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUnit = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUnit(id)
    .then((response) => {
      dispatch(actions.unitDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete unit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createUnit = (unitForCreation) => (dispatch) => {
  const data = {
    Name: unitForCreation.Name,
    UnitGroupId: Number(unitForCreation.UnitGroupId),
    UnitId: 0
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUnit(data)
    .then((response) => {
      const unit = response.data;
      dispatch(actions.unitCreated(unit));
    })
    .catch((error) => {
      error.clientMessage = "Can't create unit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUnit = (id, unit) => (dispatch) => {
  const data = {
    Name: unit.Name,
    UnitGroupId: Number(unit.UnitGroupId),
    UnitId: unit.UnitId
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUnit(id, data)
    .then((response) => {
      dispatch(actions.unitUpdated({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update unit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUnitsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUnits(ids, status)
    .then(() => {
      dispatch(actions.unitsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update units status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUnits = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUnits(ids)
    .then(() => {
      dispatch(actions.unitsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete units";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 