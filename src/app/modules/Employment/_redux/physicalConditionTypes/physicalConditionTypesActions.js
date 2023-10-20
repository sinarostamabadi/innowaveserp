
import * as requestFromServer from "./physicalConditionTypesCrud";
import { physicalConditionTypesSlice, callTypes } from "./physicalConditionTypesSlice";
const { actions } = physicalConditionTypesSlice;
export const fetchPhysicalConditionTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findPhysicalConditionTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.physicalConditionTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find physicalConditionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPhysicalConditionType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.physicalConditionTypeFetched({ physicalConditionTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPhysicalConditionTypeById(id)  
    .then((response) => {
      const physicalConditionType = response.data;
      dispatch(actions.physicalConditionTypeFetched({ physicalConditionTypeForEdit: physicalConditionType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find physicalConditionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePhysicalConditionType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePhysicalConditionType(id)  
    .then((response) => {
      dispatch(actions.physicalConditionTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete physicalConditionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPhysicalConditionType = (physicalConditionTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPhysicalConditionType(physicalConditionTypeForCreation)  
    .then((response) => {
      const physicalConditionType = response.data;
      dispatch(actions.physicalConditionTypeCreated(physicalConditionType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create physicalConditionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePhysicalConditionType = (physicalConditionType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePhysicalConditionType(physicalConditionType)  
    .then((response) => {
      dispatch(actions.physicalConditionTypeUpdated({ physicalConditionType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update physicalConditionType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePhysicalConditionTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForPhysicalConditionTypes(ids, status)  
    .then(() => {
      dispatch(actions.physicalConditionTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update physicalConditionTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePhysicalConditionTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePhysicalConditionTypes(ids)  
    .then(() => {
      dispatch(actions.physicalConditionTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete physicalConditionTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 