
import * as requestFromServer from "./technicalTypesCrud";
import { technicalTypesSlice, callTypes } from "./technicalTypesSlice";
const { actions } = technicalTypesSlice;
export const fetchTechnicalTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findTechnicalTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.technicalTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find technicalTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchTechnicalType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.technicalTypeFetched({ technicalTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getTechnicalTypeById(id)  
    .then((response) => {
      const technicalType = response.data;
      dispatch(actions.technicalTypeFetched({ technicalTypeForEdit: technicalType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find technicalType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTechnicalType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteTechnicalType(id)  
    .then((response) => {
      dispatch(actions.technicalTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete technicalType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createTechnicalType = (technicalTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createTechnicalType(technicalTypeForCreation)  
    .then((response) => {
      const technicalType = response.data;
      dispatch(actions.technicalTypeCreated(technicalType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create technicalType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTechnicalType = (technicalType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateTechnicalType(technicalType)  
    .then((response) => {
      dispatch(actions.technicalTypeUpdated({ technicalType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update technicalType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTechnicalTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForTechnicalTypes(ids, status)  
    .then(() => {
      dispatch(actions.technicalTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update technicalTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTechnicalTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteTechnicalTypes(ids)  
    .then(() => {
      dispatch(actions.technicalTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete technicalTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 