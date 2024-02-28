import * as requestFromServer from "./entitiesCrud";
import { entitiesSlice, callTypes } from "./entitiesSlice";
const { actions } = entitiesSlice;
export const fetchEntities = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findEntities(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.entitiesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find entities";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchEntity = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.entityFetched({ entityForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getEntityById(id)
    .then((response) => {
      const entity = response.data;
      dispatch(actions.entityFetched({ entityForEdit: entity }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find entity";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEntity = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEntity(id)
    .then((response) => {
      dispatch(actions.entityDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete entity";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createEntity = (entityForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createEntity(entityForCreation)
    .then((response) => {
      const entity = response.data;
      dispatch(actions.entityCreated(entity));
    })
    .catch((error) => {
      error.clientMessage = "Can't create entity";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEntity = (id, entity) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateEntity(id, entity)
    .then((response) => {
      dispatch(actions.entityUpdated({ entity }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update entity";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateEntitiesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForEntities(ids, status)
    .then(() => {
      dispatch(actions.entitiesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update entities status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteEntities = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteEntities(ids)
    .then(() => {
      dispatch(actions.entitiesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete entities";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
