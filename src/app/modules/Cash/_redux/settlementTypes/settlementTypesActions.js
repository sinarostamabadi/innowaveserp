
import * as requestFromServer from "./settlementTypesCrud";
import { settlementTypesSlice, callTypes } from "./settlementTypesSlice";
const { actions } = settlementTypesSlice;
export const fetchSettlementTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSettlementTypes(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.settlementTypesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find settlementTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSettlementType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.settlementTypeFetched({ settlementTypeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSettlementTypeById(id)  
    .then((response) => {
      const settlementType = response.data;
      dispatch(actions.settlementTypeFetched({ settlementTypeForEdit: settlementType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find settlementType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSettlementType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSettlementType(id)  
    .then((response) => {
      dispatch(actions.settlementTypeDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete settlementType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSettlementType = (settlementTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSettlementType(settlementTypeForCreation)  
    .then((response) => {
      const settlementType = response.data;
      dispatch(actions.settlementTypeCreated(settlementType));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create settlementType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSettlementType = (settlementType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSettlementType(settlementType)  
    .then((response) => {
      dispatch(actions.settlementTypeUpdated({ settlementType }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update settlementType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSettlementTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSettlementTypes(ids, status)  
    .then(() => {
      dispatch(actions.settlementTypesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update settlementTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSettlementTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSettlementTypes(ids)  
    .then(() => {
      dispatch(actions.settlementTypesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete settlementTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 