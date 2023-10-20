import * as requestFromServer from "./creditsCrud";
import { creditsSlice, callTypes } from "./creditsSlice";
const { actions } = creditsSlice;
export const fetchCredits = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCredits(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.creditsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find credits";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCredit = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.creditFetched({ creditForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCreditById(id)  
    .then((response) => {
      const credit = response.data;
      dispatch(actions.creditFetched({ creditForEdit: credit }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find credit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCredit = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCredit(id)  
    .then((response) => {
      dispatch(actions.creditDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete credit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createCredit = (creditForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCredit(creditForCreation)  
    .then((response) => {
      const credit = response.data;
      dispatch(actions.creditCreated(credit));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create credit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCredit = (credit) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCredit(credit)  
    .then((response) => {
      console.log("response =>" , response);
      dispatch(actions.creditUpdated({ credit }));
    })  
    .catch((error) => {
      console.log("error =>" , error);
      error.clientMessage = "Can't update credit";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCreditsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCredits(ids, status)  
    .then(() => {
      dispatch(actions.creditsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update credits status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCredits = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCredits(ids)  
    .then(() => {
      dispatch(actions.creditsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete credits";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
