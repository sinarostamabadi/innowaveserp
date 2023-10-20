
import * as requestFromServer from "./entityPointsCrud";
import { entityPointsSlice, callTypes } from "./entityPointsSlice";
const { actions } = entityPointsSlice;
export const fetchEntityPoints = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEntityPoints(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.entityPointsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find entityPoints";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEntityPoint = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.entityPointFetched({ entityPointForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEntityPointById(id)
    .then((response) => {
      const entityPoint = response.data;
      dispatch(actions.entityPointFetched({ entityPointForEdit: entityPoint }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find entityPoint";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEntityPoint = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEntityPoint(id)
    .then((response) => {
      dispatch(actions.entityPointDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete entityPoint";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEntityPoint = (entityPointForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createEntityPoint(entityPointForCreation)
    .then((response) => {
      const entityPoint = response.data;
      dispatch(actions.entityPointCreated(entityPoint));
    })
    .catch((error) => {
      error.clientMessage = "Can't create entityPoint";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEntityPoint = (id, entityPoint) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEntityPoint(id, entityPoint)
    .then((response) => {
      dispatch(actions.entityPointUpdated({ entityPoint }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update entityPoint";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEntityPointsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEntityPoints(ids, status)
    .then(() => {
      dispatch(actions.entityPointsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update entityPoints status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEntityPoints = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEntityPoints(ids)
    .then(() => {
      dispatch(actions.entityPointsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete entityPoints";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 