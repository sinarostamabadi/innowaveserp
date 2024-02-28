import * as requestFromServer from "./futsalCentersCrud";
import { futsalCentersSlice, callTypes } from "./futsalCentersSlice";
const { actions } = futsalCentersSlice;
export const fetchFutsalCenters = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findFutsalCenters(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.futsalCentersFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find futsalCenters";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchFutsalCenter = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.futsalCenterFetched({ futsalCenterForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getFutsalCenterById(id)
    .then((response) => {
      const futsalCenter = response.data;
      dispatch(
        actions.futsalCenterFetched({ futsalCenterForEdit: futsalCenter })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find futsalCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalCenter = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteFutsalCenter(id)
    .then((response) => {
      dispatch(actions.futsalCenterDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete futsalCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createFutsalCenter = (futsalCenterForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createFutsalCenter(futsalCenterForCreation)
    .then((response) => {
      const futsalCenter = response.data;
      dispatch(actions.futsalCenterCreated(futsalCenter));
    })
    .catch((error) => {
      error.clientMessage = "Can't create futsalCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalCenter = (futsalCenter) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateFutsalCenter(futsalCenter)
    .then((response) => {
      dispatch(actions.futsalCenterUpdated({ futsalCenter }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update futsalCenter";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalCentersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForFutsalCenters(ids, status)
    .then(() => {
      dispatch(actions.futsalCentersStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update futsalCenters status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalCenters = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteFutsalCenters(ids)
    .then(() => {
      dispatch(actions.futsalCentersDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete futsalCenters";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
