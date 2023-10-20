
import * as requestFromServer from "./insuranceTypesCrud";
import { insuranceTypesSlice, callTypes } from "./insuranceTypesSlice";
const { actions } = insuranceTypesSlice;
export const fetchInsuranceTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findInsuranceTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.insuranceTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find insuranceTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchInsuranceType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.insuranceTypeFetched({ insuranceTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getInsuranceTypeById(id)  
    .then((response) => {
      const insuranceType = response.data;
      dispatch(actions.insuranceTypeFetched({ insuranceTypeForEdit: insuranceType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find insuranceType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInsuranceType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteInsuranceType(id)  
    .then((response) => {
      dispatch(actions.insuranceTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete insuranceType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createInsuranceType = (insuranceTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createInsuranceType(insuranceTypeForCreation)  
    .then((response) => {
      const insuranceType = response.data;
      dispatch(actions.insuranceTypeCreated(insuranceType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create insuranceType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInsuranceType = (insuranceType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateInsuranceType(insuranceType)  
    .then((response) => {
      dispatch(actions.insuranceTypeUpdated({ insuranceType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update insuranceType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateInsuranceTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForInsuranceTypes(ids, status)  
    .then(() => {
      dispatch(actions.insuranceTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update insuranceTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteInsuranceTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteInsuranceTypes(ids)  
    .then(() => {
      dispatch(actions.insuranceTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete insuranceTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 