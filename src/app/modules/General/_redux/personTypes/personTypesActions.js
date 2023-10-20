
import * as requestFromServer from "./personTypesCrud";
import { personTypesSlice, callTypes } from "./personTypesSlice";
const { actions } = personTypesSlice;
export const fetchPersonTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findPersonTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.personTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find personTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPersonType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.personTypeFetched({ personTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPersonTypeById(id)  
    .then((response) => {
      const personType = response.data;
      dispatch(actions.personTypeFetched({ personTypeForEdit: personType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find personType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePersonType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePersonType(id)  
    .then((response) => {
      dispatch(actions.personTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete personType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPersonType = (personTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPersonType(personTypeForCreation)  
    .then((response) => {
      const personType = response.data;
      dispatch(actions.personTypeCreated(personType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create personType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePersonType = (id, personType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePersonType(id, personType)  
    .then((response) => {
      dispatch(actions.personTypeUpdated({ personType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update personType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePersonTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForPersonTypes(ids, status)  
    .then(() => {
      dispatch(actions.personTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update personTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePersonTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePersonTypes(ids)  
    .then(() => {
      dispatch(actions.personTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete personTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 