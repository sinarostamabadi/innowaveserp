import * as requestFromServer from "./companyTypesCrud";
import { companyTypesSlice, callTypes } from "./companyTypesSlice";
const { actions } = companyTypesSlice;
export const fetchCompanyTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCompanyTypes(queryParams)  
    .then((response) => {
      const { items, totalCount } = response.data;
      dispatch(
        actions.companyTypesFetched({ totalCount: totalCount, entities: items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find companyTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCompanyType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.companyTypeFetched({ companyTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCompanyTypeById(id)  
    .then((response) => {
      const companyType = response.data;
      dispatch(actions.companyTypeFetched({ companyTypeForEdit: companyType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find companyType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCompanyType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCompanyType(id)  
    .then((response) => {
      dispatch(actions.companyTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete companyType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createCompanyType = (companyTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCompanyType(companyTypeForCreation)  
    .then((response) => {
      const companyType = response.data;
      dispatch(actions.companyTypeCreated(companyType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create companyType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCompanyType = (companyType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCompanyType(companyType)  
    .then((response) => {
      dispatch(actions.companyTypeUpdated({ companyType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update companyType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateCompanyTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCompanyTypes(ids, status)  
    .then(() => {
      dispatch(actions.companyTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update companyTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCompanyTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCompanyTypes(ids)  
    .then(() => {
      dispatch(actions.companyTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete companyTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
