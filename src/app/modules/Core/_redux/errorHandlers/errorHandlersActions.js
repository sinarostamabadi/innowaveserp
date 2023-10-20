import * as requestFromServer from "./errorHandlersCrud";
import { errorHandlersSlice, callTypes } from "./errorHandlersSlice";
const { actions } = errorHandlersSlice;
export const fetchErrorHandlers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findErrorHandlers(queryParams)  
    .then((response) => {
      const { items, totalCount } = response.data;
      dispatch(
        actions.errorHandlersFetched({ totalCount: totalCount, entities: items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find errorHandlers";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchErrorHandler = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.errorHandlerFetched({ errorHandlerForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getErrorHandlerById(id)  
    .then((response) => {
      const errorHandler = response.data;
      dispatch(actions.errorHandlerFetched({ errorHandlerForEdit: errorHandler }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find errorHandler";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteErrorHandler = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteErrorHandler(id)  
    .then((response) => {
      dispatch(actions.errorHandlerDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete errorHandler";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createErrorHandler = (errorHandlerForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createErrorHandler(errorHandlerForCreation)  
    .then((response) => {
      const errorHandler = response.data;
      dispatch(actions.errorHandlerCreated(errorHandler));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create errorHandler";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateErrorHandler = (errorHandler) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateErrorHandler(errorHandler)  
    .then((response) => {
      console.log("response =>" , response);
      dispatch(actions.errorHandlerUpdated({ errorHandler }));
    })  
    .catch((error) => {
      console.log("error =>" , error);
      error.clientMessage = "Can't update errorHandler";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateErrorHandlersStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForErrorHandlers(ids, status)  
    .then(() => {
      dispatch(actions.errorHandlersStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update errorHandlers status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteErrorHandlers = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteErrorHandlers(ids)  
    .then(() => {
      dispatch(actions.errorHandlersDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete errorHandlers";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
