import * as requestFromServer from "./townshipsCrud";
import { townshipsSlice, callTypes } from "./townshipsSlice";
const { actions } = townshipsSlice;
export const fetchTownships = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findTownships(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.townshipsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find townships";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchTownship = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.townshipFetched({ townshipForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getTownshipById(id)
    .then((response) => {
      const township = response.data;
      dispatch(actions.townshipFetched({ townshipForEdit: township }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find township";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTownship = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTownship(id)
    .then((response) => {
      dispatch(actions.townshipDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete township";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createTownship = (townshipForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createTownship(townshipForCreation)
    .then((response) => {
      const township = response.data;
      dispatch(actions.townshipCreated(township));
    })
    .catch((error) => {
      error.clientMessage = "Can't create township";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTownship = (township) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTownship(township)
    .then((response) => {
      dispatch(actions.townshipUpdated({ township }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update township";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTownshipsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForTownships(ids, status)
    .then(() => {
      dispatch(actions.townshipsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update townships status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTownships = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTownships(ids)
    .then(() => {
      dispatch(actions.townshipsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete townships";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
