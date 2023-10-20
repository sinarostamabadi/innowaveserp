
import * as requestFromServer from "./soldiershipTypesCrud";
import { soldiershipTypesSlice, callTypes } from "./soldiershipTypesSlice";
const { actions } = soldiershipTypesSlice;
export const fetchSoldiershipTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSoldiershipTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.soldiershipTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find soldiershipTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSoldiershipType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.soldiershipTypeFetched({ soldiershipTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSoldiershipTypeById(id)  
    .then((response) => {
      const soldiershipType = response.data;
      dispatch(actions.soldiershipTypeFetched({ soldiershipTypeForEdit: soldiershipType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find soldiershipType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSoldiershipType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSoldiershipType(id)  
    .then((response) => {
      dispatch(actions.soldiershipTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete soldiershipType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSoldiershipType = (soldiershipTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSoldiershipType(soldiershipTypeForCreation)  
    .then((response) => {
      const soldiershipType = response.data;
      dispatch(actions.soldiershipTypeCreated(soldiershipType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create soldiershipType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSoldiershipType = (soldiershipType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSoldiershipType(soldiershipType)  
    .then((response) => {
      dispatch(actions.soldiershipTypeUpdated({ soldiershipType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update soldiershipType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSoldiershipTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSoldiershipTypes(ids, status)  
    .then(() => {
      dispatch(actions.soldiershipTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update soldiershipTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSoldiershipTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSoldiershipTypes(ids)  
    .then(() => {
      dispatch(actions.soldiershipTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete soldiershipTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 