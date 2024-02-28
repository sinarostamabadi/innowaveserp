import * as requestFromServer from "./settingCrud";
import { settingSlice, callTypes } from "./settingSlice";
const { actions } = settingSlice;
export const fetchSettings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSetting(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.settingFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find setting";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSetting = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.settingFetched({ settingForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSettingById(id)
    .then((response) => {
      const setting = response.data;
      dispatch(actions.settingFetched({ settingForEdit: setting }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find setting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSetting = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSetting(id)
    .then((response) => {
      dispatch(actions.settingDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete setting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSetting = (settingForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSetting(settingForCreation)
    .then((response) => {
      const setting = response.data;
      dispatch(actions.settingCreated(setting));
    })
    .catch((error) => {
      error.clientMessage = "Can't create setting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSetting = (setting) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateSetting(setting)
    .then((response) => {
      dispatch(actions.settingUpdated({ setting }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update setting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSettingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForSetting(ids, status)
    .then(() => {
      dispatch(actions.settingStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update setting status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSettings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSettings(ids)
    .then(() => {
      dispatch(actions.settingDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete setting";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
