import * as requestFromServer from "./phonesCrud";
import { phonesSlice, callTypes } from "./phonesSlice";
const { actions } = phonesSlice;
export const fetchPhones = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findPhones(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.phonesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find phones";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPhone = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.phoneFetched({ phoneForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getPhoneById(id)  
    .then((response) => {
      const phone = response.data;
      dispatch(actions.phoneFetched({ phoneForEdit: phone }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find phone";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePhone = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePhone(id)  
    .then((response) => {
      dispatch(actions.phoneDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete phone";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createPhone = (phoneForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createPhone(phoneForCreation)  
    .then((response) => {
      const phone = response.data;
      dispatch(actions.phoneCreated(phone));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create phone";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updatePhone = (phone) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updatePhone(phone)  
    .then((response) => {
      console.log("response =>" , response);
      dispatch(actions.phoneUpdated({ phone }));
    })  
    .catch((error) => {
      console.log("error =>" , error);
      error.clientMessage = "Can't update phone";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updatePhonesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForPhones(ids, status)  
    .then(() => {
      dispatch(actions.phonesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update phones status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePhones = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deletePhones(ids)  
    .then(() => {
      dispatch(actions.phonesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete phones";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
