import * as requestFromServer from "./nextOperationsCrud";
import { nextOperationsSlice, callTypes } from "./nextOperationsSlice";
const { actions } = nextOperationsSlice;
export const fetchNextOperations = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findNextOperations(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.nextOperationsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find nextOperations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchNextOperation = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.nextOperationFetched({ nextOperationForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getNextOperationById(id)
    .then((response) => {
      const nextOperation = response.data;
      dispatch(
        actions.nextOperationFetched({ nextOperationForEdit: nextOperation })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find nextOperation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteNextOperation = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteNextOperation(id)
    .then((response) => {
      dispatch(actions.nextOperationDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete nextOperation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createNextOperation = (nextOperationForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createNextOperation(nextOperationForCreation)
    .then((response) => {
      const nextOperation = response.data;
      dispatch(actions.nextOperationCreated(nextOperation));
    })
    .catch((error) => {
      error.clientMessage = "Can't create nextOperation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateNextOperation = (nextOperation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateNextOperation(nextOperation)
    .then((response) => {
      dispatch(actions.nextOperationUpdated({ nextOperation }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update nextOperation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateNextOperationsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForNextOperations(ids, status)
    .then(() => {
      dispatch(actions.nextOperationsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update nextOperations status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteNextOperations = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteNextOperations(ids)
    .then(() => {
      dispatch(actions.nextOperationsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete nextOperations";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
