
import * as requestFromServer from "./sellDocumentCostsCrud";
import { sellDocumentCostsSlice, callTypes } from "./sellDocumentCostsSlice";
const { actions } = sellDocumentCostsSlice;
export const fetchSellDocumentCosts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellDocumentCosts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellDocumentCostsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocumentCosts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellDocumentCost = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellDocumentCostFetched({ sellDocumentCostForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellDocumentCostById(id)  
    .then((response) => {
      const sellDocumentCost = response.data;
      dispatch(actions.sellDocumentCostFetched({ sellDocumentCostForEdit: sellDocumentCost }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocumentCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocumentCost = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocumentCost(id)  
    .then((response) => {
      dispatch(actions.sellDocumentCostDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocumentCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellDocumentCost = (sellDocumentCostForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellDocumentCost(sellDocumentCostForCreation)  
    .then((response) => {
      const sellDocumentCost = response.data;
      dispatch(actions.sellDocumentCostCreated(sellDocumentCost));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellDocumentCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocumentCost = (sellDocumentCost) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellDocumentCost(sellDocumentCost)  
    .then((response) => {
      dispatch(actions.sellDocumentCostUpdated({ sellDocumentCost }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocumentCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocumentCostsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellDocumentCosts(ids, status)  
    .then(() => {
      dispatch(actions.sellDocumentCostsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocumentCosts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocumentCosts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocumentCosts(ids)  
    .then(() => {
      dispatch(actions.sellDocumentCostsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocumentCosts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 