import * as requestFromServer from "./cashsCrud";
import { cashsSlice, callTypes } from "./cashsSlice";
const { actions } = cashsSlice;
export const fetchCashs = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCashs(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.cashsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find cashs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCash = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.cashFetched({ cashForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCashById(id)  
    .then((response) => {
      const cash = response.data;
      dispatch(actions.cashFetched({ cashForEdit: cash }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find cash";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCash = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCash(id)  
    .then((response) => {
      dispatch(actions.cashDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete cash";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCash = (cashForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCash(cashForCreation)  
    .then((response) => {
      const cash = response.data;
      dispatch(actions.cashCreated(cash));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create cash";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCash = (cash) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCash(cash)  
    .then((response) => {
      dispatch(actions.cashUpdated({ cash }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update cash";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCashsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCashs(ids, status)  
    .then(() => {
      dispatch(actions.cashsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update cashs status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCashs = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCashs(ids)  
    .then(() => {
      dispatch(actions.cashsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete cashs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 
