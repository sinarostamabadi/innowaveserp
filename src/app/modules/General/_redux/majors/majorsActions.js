import * as requestFromServer from "./majorsCrud";
import { majorsSlice, callTypes } from "./majorsSlice";
const { actions } = majorsSlice;
export const fetchMajors = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMajors(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.majorsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find majors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMajor = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.majorFetched({ majorForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMajorById(id)
    .then((response) => {
      const major = response.data;
      dispatch(actions.majorFetched({ majorForEdit: major }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find major";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMajor = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMajor(id)
    .then((response) => {
      dispatch(actions.majorDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete major";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMajor = (majorForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createMajor(majorForCreation)
    .then((response) => {
      const major = response.data;
      dispatch(actions.majorCreated(major));
    })
    .catch((error) => {
      error.clientMessage = "Can't create major";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMajor = (id, major) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMajor(id, major)
    .then((response) => {
      dispatch(actions.majorUpdated({ major }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update major";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMajorsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMajors(ids, status)
    .then(() => {
      dispatch(actions.majorsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update majors status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMajors = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMajors(ids)
    .then(() => {
      dispatch(actions.majorsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete majors";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
