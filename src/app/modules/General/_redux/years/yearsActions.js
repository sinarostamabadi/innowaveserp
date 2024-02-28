import * as requestFromServer from "./yearsCrud";
import { yearsSlice, callTypes } from "./yearsSlice";
const { actions } = yearsSlice;
export const fetchYears = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findYears(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.yearsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find years";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchYear = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.yearFetched({ yearForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getYearById(id)
    .then((response) => {
      const year = response.data;
      dispatch(actions.yearFetched({ yearForEdit: year }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find year";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteYear = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteYear(id)
    .then((response) => {
      dispatch(actions.yearDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete year";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createYear = (yearForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createYear(yearForCreation)
    .then((response) => {
      const year = response.data;
      dispatch(actions.yearCreated(year));
    })
    .catch((error) => {
      error.clientMessage = "Can't create year";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateYear = (id, year) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateYear(id, year)
    .then((response) => {
      dispatch(actions.yearUpdated({ year }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update year";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateYearsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForYears(ids, status)
    .then(() => {
      dispatch(actions.yearsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update years status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteYears = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteYears(ids)
    .then(() => {
      dispatch(actions.yearsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete years";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
