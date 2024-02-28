import * as requestFromServer from "./posesCrud";
import { posesSlice, callTypes } from "./posesSlice";
const { actions } = posesSlice;
export const fetchPoses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPoses(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.posesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find poses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPos = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.posFetched({ posForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPosById(id)
    .then((response) => {
      const pos = response.data;
      dispatch(actions.posFetched({ posForEdit: pos }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find pos";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePos = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePos(id)
    .then((response) => {
      dispatch(actions.posDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete pos";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPos = (posForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPos(posForCreation)
    .then((response) => {
      const pos = response.data;
      dispatch(actions.posCreated(pos));
      return;
    })
    .catch((error) => {
      error.clientMessage = "Can't create pos";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePos = (id, pos) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePos(id, pos)
    .then((response) => {
      dispatch(actions.posUpdated({ pos }));
      return;
    })
    .catch((error) => {
      error.clientMessage = "Can't update pos";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePosesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPoses(ids, status)
    .then(() => {
      dispatch(actions.posesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoses(ids)
    .then(() => {
      dispatch(actions.posesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
