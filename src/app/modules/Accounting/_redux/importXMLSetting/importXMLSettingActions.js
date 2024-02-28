import * as requestFromServer from "./importXMLSettingCrud";
import { importXMLSettingSlice, callTypes } from "./importXMLSettingSlice";
const { actions } = importXMLSettingSlice;
export const fetchImportXMLSetting = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findImportXMLSetting(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.importXMLSettingFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find importXMLSetting";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchImportXMLSetting = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.importXMLSettingFetched({ importXMLSettingForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getImportXMLSettingById(id)
    .then((response) => {
      const importXMLSetting = response.data;
      dispatch(
        actions.importXMLSettingFetched({
          importXMLSettingForEdit: importXMLSetting,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find importXMLSetting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteImportXMLSetting = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImportXMLSetting(id)
    .then((response) => {
      dispatch(actions.importXMLSettingDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete importXMLSetting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createImportXMLSetting =
  (importXMLSettingForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createImportXMLSetting(importXMLSettingForCreation)
      .then((response) => {
        const importXMLSetting = response.data;
        dispatch(actions.importXMLSettingCreated(importXMLSetting));
      })
      .catch((error) => {
        error.clientMessage = "Can't create importXMLSetting";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateImportXMLSetting = (importXMLSetting) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateImportXMLSetting(importXMLSetting)
    .then((response) => {
      dispatch(actions.importXMLSettingUpdated({ importXMLSetting }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update importXMLSetting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateImportXMLSettingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForImportXMLSetting(ids, status)
    .then(() => {
      dispatch(actions.importXMLSettingStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update importXMLSetting status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteImportXMLSetting = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImportXMLSetting(ids)
    .then(() => {
      dispatch(actions.importXMLSettingDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete importXMLSetting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
