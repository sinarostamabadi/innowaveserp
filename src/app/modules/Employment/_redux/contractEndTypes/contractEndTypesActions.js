
import * as requestFromServer from "./contractEndTypesCrud";
import { contractEndTypesSlice, callTypes } from "./contractEndTypesSlice";
const { actions } = contractEndTypesSlice;
export const fetchContractEndTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findContractEndTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.contractEndTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find contractEndTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchContractEndType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.contractEndTypeFetched({ contractEndTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getContractEndTypeById(id)  
    .then((response) => {
      const contractEndType = response.data;
      dispatch(actions.contractEndTypeFetched({ contractEndTypeForEdit: contractEndType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find contractEndType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteContractEndType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteContractEndType(id)  
    .then((response) => {
      dispatch(actions.contractEndTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete contractEndType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createContractEndType = (contractEndTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createContractEndType(contractEndTypeForCreation)  
    .then((response) => {
      const contractEndType = response.data;
      dispatch(actions.contractEndTypeCreated(contractEndType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create contractEndType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateContractEndType = (contractEndType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateContractEndType(contractEndType)  
    .then((response) => {
      dispatch(actions.contractEndTypeUpdated({ contractEndType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update contractEndType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateContractEndTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForContractEndTypes(ids, status)  
    .then(() => {
      dispatch(actions.contractEndTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update contractEndTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteContractEndTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteContractEndTypes(ids)  
    .then(() => {
      dispatch(actions.contractEndTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete contractEndTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 