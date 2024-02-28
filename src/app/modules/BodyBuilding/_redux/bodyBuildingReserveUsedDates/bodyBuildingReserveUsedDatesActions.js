import * as requestFromServer from "./bodyBuildingReserveUsedDatesCrud";
import {
  bodyBuildingReserveUsedDatesSlice,
  callTypes,
} from "./bodyBuildingReserveUsedDatesSlice";
const { actions } = bodyBuildingReserveUsedDatesSlice;
export const fetchBodyBuildingReserveUsedDates =
  (queryParams) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .findBodyBuildingReserveUsedDates(queryParams)
      .then((response) => {
        const { Items, TotalCount } = response.data;
        dispatch(
          actions.bodyBuildingReserveUsedDatesFetched({
            totalCount: TotalCount,
            entities: Items,
          })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't find bodyBuildingReserveUsedDates";
        dispatch(actions.catchError({ error, callType: callTypes.list }));
      });
  };
export const fetchBodyBuildingReserveUsedDate = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.bodyBuildingReserveUsedDateFetched({
        bodyBuildingReserveUsedDateForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBodyBuildingReserveUsedDateById(id)
    .then((response) => {
      const bodyBuildingReserveUsedDate = response.data;
      dispatch(
        actions.bodyBuildingReserveUsedDateFetched({
          bodyBuildingReserveUsedDateForEdit: bodyBuildingReserveUsedDate,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find bodyBuildingReserveUsedDate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBodyBuildingReserveUsedDate = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBodyBuildingReserveUsedDate(id)
    .then((response) => {
      dispatch(actions.bodyBuildingReserveUsedDateDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingReserveUsedDate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBodyBuildingReserveUsedDate =
  (bodyBuildingReserveUsedDateForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createBodyBuildingReserveUsedDate(bodyBuildingReserveUsedDateForCreation)
      .then((response) => {
        const bodyBuildingReserveUsedDate = response.data;
        dispatch(
          actions.bodyBuildingReserveUsedDateCreated(
            bodyBuildingReserveUsedDate
          )
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't create bodyBuildingReserveUsedDate";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBodyBuildingReserveUsedDate =
  (bodyBuildingReserveUsedDate) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateBodyBuildingReserveUsedDate(bodyBuildingReserveUsedDate)
      .then((response) => {
        dispatch(
          actions.bodyBuildingReserveUsedDateUpdated({
            bodyBuildingReserveUsedDate,
          })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update bodyBuildingReserveUsedDate";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBodyBuildingReserveUsedDatesStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForBodyBuildingReserveUsedDates(ids, status)
      .then(() => {
        dispatch(
          actions.bodyBuildingReserveUsedDatesStatusUpdated({ ids, status })
        );
      })
      .catch((error) => {
        error.clientMessage =
          "Can't update bodyBuildingReserveUsedDates status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteBodyBuildingReserveUsedDates = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBodyBuildingReserveUsedDates(ids)
    .then(() => {
      dispatch(actions.bodyBuildingReserveUsedDatesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bodyBuildingReserveUsedDates";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
