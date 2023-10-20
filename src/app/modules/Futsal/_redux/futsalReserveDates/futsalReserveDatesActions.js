
import * as requestFromServer from "./futsalReserveDatesCrud";
import { futsalReserveDatesSlice, callTypes } from "./futsalReserveDatesSlice";
const { actions } = futsalReserveDatesSlice;
export const fetchFutsalReserveDates = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findFutsalReserveDates(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.futsalReserveDatesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalReserveDates";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchFutsalReserveDate = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.futsalReserveDateFetched({ futsalReserveDateForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getFutsalReserveDateById(id)  
    .then((response) => {
      const futsalReserveDate = response.data;
      dispatch(actions.futsalReserveDateFetched({ futsalReserveDateForEdit: futsalReserveDate }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find futsalReserveDate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalReserveDate = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalReserveDate(id)  
    .then((response) => {
      dispatch(actions.futsalReserveDateDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalReserveDate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createFutsalReserveDate = (futsalReserveDateForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createFutsalReserveDate(futsalReserveDateForCreation)  
    .then((response) => {
      const futsalReserveDate = response.data;
      dispatch(actions.futsalReserveDateCreated(futsalReserveDate));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create futsalReserveDate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalReserveDate = (futsalReserveDate) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateFutsalReserveDate(futsalReserveDate)  
    .then((response) => {
      dispatch(actions.futsalReserveDateUpdated({ futsalReserveDate }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalReserveDate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateFutsalReserveDatesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForFutsalReserveDates(ids, status)  
    .then(() => {
      dispatch(actions.futsalReserveDatesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update futsalReserveDates status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteFutsalReserveDates = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteFutsalReserveDates(ids)  
    .then(() => {
      dispatch(actions.futsalReserveDatesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete futsalReserveDates";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 