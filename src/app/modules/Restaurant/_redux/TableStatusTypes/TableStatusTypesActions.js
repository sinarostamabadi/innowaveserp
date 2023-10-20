
import * as requestFromServer from "./tableStatusTypesCrud";
import { tableStatusTypesSlice, callTypes } from "./tableStatusTypesSlice";
const { actions } = tableStatusTypesSlice;
export const fetchTableStatusTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findTableStatusTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.tableStatusTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find tableStatusTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchTableStatusType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.tableStatusTypeFetched({ tableStatusTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getTableStatusTypeById(id)  
    .then((response) => {
      const tableStatusType = response.data;
      dispatch(actions.tableStatusTypeFetched({ tableStatusTypeForEdit: tableStatusType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find tableStatusType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTableStatusType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteTableStatusType(id)  
    .then((response) => {
      dispatch(actions.tableStatusTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete tableStatusType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createTableStatusType = (tableStatusTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createTableStatusType(tableStatusTypeForCreation)  
    .then((response) => {
      const tableStatusType = response.data;
      dispatch(actions.tableStatusTypeCreated(tableStatusType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create tableStatusType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTableStatusType = (tableStatusType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateTableStatusType(tableStatusType)  
    .then((response) => {
      dispatch(actions.tableStatusTypeUpdated({ tableStatusType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update tableStatusType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateTableStatusTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForTableStatusTypes(ids, status)  
    .then(() => {
      dispatch(actions.tableStatusTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update tableStatusTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteTableStatusTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteTableStatusTypes(ids)  
    .then(() => {
      dispatch(actions.tableStatusTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete tableStatusTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 