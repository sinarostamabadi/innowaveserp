
import * as requestFromServer from "./unitConversionsCrud";
import { unitConversionsSlice, callTypes } from "./unitConversionsSlice";
const { actions } = unitConversionsSlice;
export const fetchUnitConversions = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findUnitConversions(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.unitConversionsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find unitConversions";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchUnitConversion = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.unitConversionFetched({ unitConversionForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getUnitConversionById(id)
    .then((response) => {
      const unitConversion = response.data;
      dispatch(actions.unitConversionFetched({ unitConversionForEdit: unitConversion }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find unitConversion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUnitConversion = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUnitConversion(id)
    .then((response) => {
      dispatch(actions.unitConversionDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete unitConversion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createUnitConversion = (unitConversionForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createUnitConversion(unitConversionForCreation)
    .then((response) => {
      const unitConversion = response.data;
      dispatch(actions.unitConversionCreated(unitConversion));
    })
    .catch((error) => {
      error.clientMessage = "Can't create unitConversion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUnitConversion = (id, unitConversion) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateUnitConversion(id, unitConversion)
    .then((response) => {
      dispatch(actions.unitConversionUpdated({ unitConversion }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update unitConversion";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateUnitConversionsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForUnitConversions(ids, status)
    .then(() => {
      dispatch(actions.unitConversionsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update unitConversions status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteUnitConversions = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteUnitConversions(ids)
    .then(() => {
      dispatch(actions.unitConversionsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete unitConversions";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 