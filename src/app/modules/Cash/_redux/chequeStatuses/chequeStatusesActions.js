import * as requestFromServer from "./chequeStatusesCrud";
import { chequeStatusesSlice, callTypes } from "./chequeStatusesSlice";
const { actions } = chequeStatusesSlice;
export const fetchChequeStatuses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findChequeStatuses(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.chequeStatusesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find chequeStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchChequeStatus = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.chequeStatusFetched({ chequeStatusForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getChequeStatusById(id)
    .then((response) => {
      const chequeStatus = response.data;
      dispatch(
        actions.chequeStatusFetched({ chequeStatusForEdit: chequeStatus })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find chequeStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteChequeStatus = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteChequeStatus(id)
    .then((response) => {
      dispatch(actions.chequeStatusDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete chequeStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createChequeStatus = (chequeStatusForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createChequeStatus(chequeStatusForCreation)
    .then((response) => {
      const chequeStatus = response.data;
      dispatch(actions.chequeStatusCreated(chequeStatus));
    })
    .catch((error) => {
      error.clientMessage = "Can't create chequeStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateChequeStatus = (chequeStatus) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateChequeStatus(chequeStatus)
    .then((response) => {
      dispatch(actions.chequeStatusUpdated({ chequeStatus }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update chequeStatus";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateChequeStatusesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForChequeStatuses(ids, status)
    .then(() => {
      dispatch(actions.chequeStatusesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update chequeStatuses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteChequeStatuses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteChequeStatuses(ids)
    .then(() => {
      dispatch(actions.chequeStatusesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete chequeStatuses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
