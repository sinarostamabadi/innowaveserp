
import * as requestFromServer from "./companyPersonTypesCrud";
import { companyPersonTypesSlice, callTypes } from "./companyPersonTypesSlice";
const { actions } = companyPersonTypesSlice;
export const fetchCompanyPersonTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCompanyPersonTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.companyPersonTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find companyPersonTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCompanyPersonType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.companyPersonTypeFetched({ companyPersonTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCompanyPersonTypeById(id)  
    .then((response) => {
      const companyPersonType = response.data;
      dispatch(actions.companyPersonTypeFetched({ companyPersonTypeForEdit: companyPersonType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find companyPersonType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCompanyPersonType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCompanyPersonType(id)  
    .then((response) => {
      dispatch(actions.companyPersonTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete companyPersonType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCompanyPersonType = (companyPersonTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCompanyPersonType(companyPersonTypeForCreation)  
    .then((response) => {
      const companyPersonType = response.data;
      dispatch(actions.companyPersonTypeCreated(companyPersonType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create companyPersonType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCompanyPersonType = (id, companyPersonType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCompanyPersonType(id, companyPersonType)  
    .then((response) => {
      dispatch(actions.companyPersonTypeUpdated({ companyPersonType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update companyPersonType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCompanyPersonTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCompanyPersonTypes(ids, status)  
    .then(() => {
      dispatch(actions.companyPersonTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update companyPersonTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCompanyPersonTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCompanyPersonTypes(ids)  
    .then(() => {
      dispatch(actions.companyPersonTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete companyPersonTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 