import * as requestFromServer from "./importXMLKeiesCrud";
import { importXMLKeiesSlice, callTypes } from "./importXMLKeiesSlice";
const { actions } = importXMLKeiesSlice;
export const fetchImportXMLKeies = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findImportXMLKeies(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.importXMLKeiesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find importXMLKeies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchImportXMLKey = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.importXMLKeyFetched({ importXMLKeyForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getImportXMLKeyById(id)
    .then((response) => {
      const importXMLKey = response.data;
      dispatch(
        actions.importXMLKeyFetched({ importXMLKeyForEdit: importXMLKey })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find importXMLKey";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteImportXMLKey = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImportXMLKey(id)
    .then((response) => {
      dispatch(actions.importXMLKeyDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete importXMLKey";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createImportXMLKey = (importXMLKeyForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createImportXMLKey(importXMLKeyForCreation)
    .then((response) => {
      const importXMLKey = response.data;
      dispatch(actions.importXMLKeyCreated(importXMLKey));
    })
    .catch((error) => {
      error.clientMessage = "Can't create importXMLKey";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateImportXMLKey = (importXMLKey) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateImportXMLKey(importXMLKey)
    .then((response) => {
      dispatch(actions.importXMLKeyUpdated({ importXMLKey }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update importXMLKey";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateImportXMLKeiesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForImportXMLKeies(ids, status)
    .then(() => {
      dispatch(actions.importXMLKeiesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update importXMLKeies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteImportXMLKeies = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteImportXMLKeies(ids)
    .then(() => {
      dispatch(actions.importXMLKeiesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete importXMLKeies";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
