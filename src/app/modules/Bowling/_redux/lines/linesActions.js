import * as requestFromServer from "./linesCrud";
import { linesSlice, callTypes } from "./linesSlice";
const { actions } = linesSlice;
export const fetchLines = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findLines(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.linesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find lines";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchLine = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.lineFetched({ lineForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLineById(id)
    .then((response) => {
      const line = response.data;
      dispatch(actions.lineFetched({ lineForEdit: line }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find line";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLine = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLine(id)
    .then((response) => {
      dispatch(actions.lineDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete line";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createLine = (line) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createLine(line)
    .then((response) => {
      const line = response.data;
      dispatch(actions.lineCreated(line));
    })
    .catch((error) => {
      error.clientMessage = "Can't create line";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLine = (id, line) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateLine(id, line)
    .then((response) => {
      dispatch(actions.lineUpdated({ line }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update line";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateLinesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForLines(ids, status)
    .then(() => {
      dispatch(actions.linesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update lines status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteLines = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteLines(ids)
    .then(() => {
      dispatch(actions.linesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete lines";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
