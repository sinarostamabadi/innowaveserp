import * as requestFromServer from "./homeStatusesCrud";
import { homeStatusesSlice, callTypes } from "./homeStatusesSlice";
const { actions } = homeStatusesSlice;
export const fetchHomeStatuses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findHomeStatuses(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.homeStatusesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find homeStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchHomeStatus = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.homeStatusFetched({ homeStatusForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getHomeStatusById(id)
    .then((response) => {
      const homeStatus = response.data;
      dispatch(actions.homeStatusFetched({ homeStatusForEdit: homeStatus }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find homeStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteHomeStatus = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteHomeStatus(id)
    .then((response) => {
      dispatch(actions.homeStatusDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete homeStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createHomeStatus = (homeStatusForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createHomeStatus(homeStatusForCreation)
    .then((response) => {
      const homeStatus = response.data;
      dispatch(actions.homeStatusCreated(homeStatus));
    })
    .catch((error) => {
      error.clientMessage = "Can't create homeStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateHomeStatus = (homeStatus) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateHomeStatus(homeStatus)
    .then((response) => {
      dispatch(actions.homeStatusUpdated({ homeStatus }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update homeStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateHomeStatusesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForHomeStatuses(ids, status)
    .then(() => {
      dispatch(actions.homeStatusesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update homeStatuses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteHomeStatuses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteHomeStatuses(ids)
    .then(() => {
      dispatch(actions.homeStatusesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete homeStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
