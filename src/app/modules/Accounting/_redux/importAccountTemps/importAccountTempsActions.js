import * as requestFromServer from "./importAccountTempsCrud";
import { importAccountTempsSlice, callTypes } from "./importAccountTempsSlice";
const { actions } = importAccountTempsSlice;
export const fetchImportAccountTemps = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findImportAccountTemps(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.importAccountTempsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find importAccountTemps";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchImportAccountTemp = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.importAccountTempFetched({ importAccountTempForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getImportAccountTempById(id)
    .then((response) => {
      const importAccountTemp = response.data;
      dispatch(
        actions.importAccountTempFetched({
          importAccountTempForEdit: importAccountTemp,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find importAccountTemp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteImportAccountTemp = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImportAccountTemp(id)
    .then((response) => {
      dispatch(actions.importAccountTempDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete importAccountTemp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createImportAccountTemp =
  (importAccountTempForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createImportAccountTemp(importAccountTempForCreation)
      .then((response) => {
        const importAccountTemp = response.data;
        dispatch(actions.importAccountTempCreated(importAccountTemp));
      })
      .catch((error) => {
        error.clientMessage = "Can't create importAccountTemp";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateImportAccountTemp = (importAccountTemp) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateImportAccountTemp(importAccountTemp)
    .then((response) => {
      dispatch(actions.importAccountTempUpdated({ importAccountTemp }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update importAccountTemp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateImportAccountTempsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForImportAccountTemps(ids, status)
    .then(() => {
      dispatch(actions.importAccountTempsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update importAccountTemps status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteImportAccountTemps = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImportAccountTemps(ids)
    .then(() => {
      dispatch(actions.importAccountTempsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete importAccountTemps";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
