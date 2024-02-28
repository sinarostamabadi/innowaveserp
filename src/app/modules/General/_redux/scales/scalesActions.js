import * as requestFromServer from "./scalesCrud";
import { scalesSlice, callTypes } from "./scalesSlice";

const { actions } = scalesSlice;
export const fetchScales = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findScales(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.scalesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find scales";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchScale = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.scaleFetched({ scaleForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getScaleById(id)
    .then((response) => {
      const scale = response.data;
      dispatch(actions.scaleFetched({ scaleForEdit: scale }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find scale";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteScale = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteScale(id)
    .then((response) => {
      dispatch(actions.scaleDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete scale";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createScale = (scale) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createScale(scale)
    .then((response) => {
      const scale = response.data;
      dispatch(actions.scaleCreated(scale));
    })
    .catch((error) => {
      error.clientMessage = "Can't create scale";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateScale = (id, scale) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateScale(id, scale)
    .then((response) => {
      dispatch(actions.scaleUpdated({ scale }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update scale";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateScalesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForScales(ids, status)
    .then(() => {
      dispatch(actions.scalesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update scales status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteScales = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteScales(ids)
    .then(() => {
      dispatch(actions.scalesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete scales";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
