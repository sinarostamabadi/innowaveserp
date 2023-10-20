
import * as requestFromServer from "./relationTypesCrud";
import { relationTypesSlice, callTypes } from "./relationTypesSlice";
const { actions } = relationTypesSlice;
export const fetchRelationTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findRelationTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.relationTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find relationTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRelationType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.relationTypeFetched({ relationTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getRelationTypeById(id)  
    .then((response) => {
      const relationType = response.data;
      dispatch(actions.relationTypeFetched({ relationTypeForEdit: relationType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find relationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRelationType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRelationType(id)  
    .then((response) => {
      dispatch(actions.relationTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete relationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRelationType = (relationTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createRelationType(relationTypeForCreation)  
    .then((response) => {
      const relationType = response.data;
      dispatch(actions.relationTypeCreated(relationType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create relationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRelationType = (relationType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateRelationType(relationType)  
    .then((response) => {
      dispatch(actions.relationTypeUpdated({ relationType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update relationType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRelationTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForRelationTypes(ids, status)  
    .then(() => {
      dispatch(actions.relationTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update relationTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRelationTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteRelationTypes(ids)  
    .then(() => {
      dispatch(actions.relationTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete relationTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 