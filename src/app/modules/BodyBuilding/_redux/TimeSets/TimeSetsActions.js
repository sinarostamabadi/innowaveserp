import * as requestFromServer from "./TimeSetsCrud";
import { timeSetsSlice, callTypes } from "./TimeSetsSlice";
const { actions } = timeSetsSlice;
export const fetchTimeSets = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findTimeSets(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.timeSetsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find timeSets";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchTimeSet = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.timeSetFetched({ timeSetForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getTimeSetById(id)
    .then((response) => {
      const timeSet = response.data;
      dispatch(actions.timeSetFetched({ timeSetForEdit: timeSet }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find timeSet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTimeSet = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTimeSet(id)
    .then((response) => {
      dispatch(actions.timeSetDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete timeSet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createTimeSet = (timeSetForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createTimeSet(timeSetForCreation)
    .then((response) => {
      const timeSet = response.data;
      dispatch(actions.timeSetCreated(timeSet));
    })
    .catch((error) => {
      error.clientMessage = "Can't create timeSet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTimeSet = (id, timeSet) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTimeSet(id, timeSet)
    .then((response) => {
      dispatch(actions.timeSetUpdated({ timeSet }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update timeSet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTimeSetsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForTimeSets(ids, status)
    .then(() => {
      dispatch(actions.timeSetsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update timeSets status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTimeSets = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTimeSets(ids)
    .then(() => {
      dispatch(actions.timeSetsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete timeSets";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
