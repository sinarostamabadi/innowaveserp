
import * as requestFromServer from "./contractTypesCrud";
import { contractTypesSlice, callTypes } from "./contractTypesSlice";
const { actions } = contractTypesSlice;
export const fetchContractTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findContractTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.contractTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find contractTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchContractType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.contractTypeFetched({ contractTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getContractTypeById(id)  
    .then((response) => {
      const contractType = response.data;
      dispatch(actions.contractTypeFetched({ contractTypeForEdit: contractType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find contractType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteContractType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteContractType(id)  
    .then((response) => {
      dispatch(actions.contractTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete contractType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createContractType = (contractTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createContractType(contractTypeForCreation)  
    .then((response) => {
      const contractType = response.data;
      dispatch(actions.contractTypeCreated(contractType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create contractType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateContractType = (contractType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateContractType(contractType)  
    .then((response) => {
      dispatch(actions.contractTypeUpdated({ contractType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update contractType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateContractTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForContractTypes(ids, status)  
    .then(() => {
      dispatch(actions.contractTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update contractTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteContractTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteContractTypes(ids)  
    .then(() => {
      dispatch(actions.contractTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete contractTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 