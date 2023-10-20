
import * as requestFromServer from "./settlementsCrud";
import { settlementsSlice, callTypes } from "./settlementsSlice";
const { actions } = settlementsSlice;
export const fetchSettlements = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSettlements(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.settlementsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find settlements";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSettlement = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.settlementFetched({ settlementForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSettlementById(id)  
    .then((response) => {
      const settlement = response.data;
      dispatch(actions.settlementFetched({ settlementForEdit: settlement }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find settlement";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSettlement = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSettlement(id)  
    .then((response) => {
      dispatch(actions.settlementDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete settlement";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSettlement = (settlementForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSettlement(settlementForCreation)  
    .then((response) => {
      const settlement = response.data;
      dispatch(actions.settlementCreated(settlement));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create settlement";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSettlement = (settlement) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSettlement(settlement)  
    .then((response) => {
      dispatch(actions.settlementUpdated({ settlement }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update settlement";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSettlementsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSettlements(ids, status)  
    .then(() => {
      dispatch(actions.settlementsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update settlements status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSettlements = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSettlements(ids)  
    .then(() => {
      dispatch(actions.settlementsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete settlements";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 