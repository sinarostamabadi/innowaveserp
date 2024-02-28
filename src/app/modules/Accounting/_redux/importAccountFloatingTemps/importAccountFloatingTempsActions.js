import * as requestFromServer from "./importAccountFloatingTempsCrud";
import {
  importAccountFloatingTempsSlice,
  callTypes,
} from "./importAccountFloatingTempsSlice";
const { actions } = importAccountFloatingTempsSlice;
export const fetchImportAccountFloatingTemps = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findImportAccountFloatingTemps(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.importAccountFloatingTempsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find importAccountFloatingTemps";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchImportAccountFloatingTemp = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.importAccountFloatingTempFetched({
        importAccountFloatingTempForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getImportAccountFloatingTempById(id)
    .then((response) => {
      const importAccountFloatingTemp = response.data;
      dispatch(
        actions.importAccountFloatingTempFetched({
          importAccountFloatingTempForEdit: importAccountFloatingTemp,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find importAccountFloatingTemp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteImportAccountFloatingTemp = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImportAccountFloatingTemp(id)
    .then((response) => {
      dispatch(actions.importAccountFloatingTempDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete importAccountFloatingTemp";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createImportAccountFloatingTemp =
  (importAccountFloatingTempForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createImportAccountFloatingTemp(importAccountFloatingTempForCreation)
      .then((response) => {
        const importAccountFloatingTemp = response.data;
        dispatch(
          actions.importAccountFloatingTempCreated(importAccountFloatingTemp)
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't create importAccountFloatingTemp";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateImportAccountFloatingTemp =
  (importAccountFloatingTemp) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateImportAccountFloatingTemp(importAccountFloatingTemp)
      .then((response) => {
        dispatch(
          actions.importAccountFloatingTempUpdated({
            importAccountFloatingTemp,
          })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update importAccountFloatingTemp";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateImportAccountFloatingTempsStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForImportAccountFloatingTemps(ids, status)
      .then(() => {
        dispatch(
          actions.importAccountFloatingTempsStatusUpdated({ ids, status })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update importAccountFloatingTemps status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteImportAccountFloatingTemps = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImportAccountFloatingTemps(ids)
    .then(() => {
      dispatch(actions.importAccountFloatingTempsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete importAccountFloatingTemps";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
