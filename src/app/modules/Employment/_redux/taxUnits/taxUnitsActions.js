import * as requestFromServer from "./taxUnitsCrud";
import { taxUnitsSlice, callTypes } from "./taxUnitsSlice";
const { actions } = taxUnitsSlice;
export const fetchTaxUnits = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findTaxUnits(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.taxUnitsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find taxUnits";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchTaxUnit = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.taxUnitFetched({ taxUnitForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getTaxUnitById(id)
    .then((response) => {
      const taxUnit = response.data;
      dispatch(actions.taxUnitFetched({ taxUnitForEdit: taxUnit }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find taxUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTaxUnit = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTaxUnit(id)
    .then((response) => {
      dispatch(actions.taxUnitDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete taxUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createTaxUnit = (taxUnitForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createTaxUnit(taxUnitForCreation)
    .then((response) => {
      const taxUnit = response.data;
      dispatch(actions.taxUnitCreated(taxUnit));
    })
    .catch((error) => {
      error.clientMessage = "Can't create taxUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTaxUnit = (taxUnit) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTaxUnit(taxUnit)
    .then((response) => {
      dispatch(actions.taxUnitUpdated({ taxUnit }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update taxUnit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTaxUnitsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForTaxUnits(ids, status)
    .then(() => {
      dispatch(actions.taxUnitsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update taxUnits status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTaxUnits = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTaxUnits(ids)
    .then(() => {
      dispatch(actions.taxUnitsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete taxUnits";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
