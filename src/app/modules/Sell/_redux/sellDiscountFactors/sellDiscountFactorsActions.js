
import * as requestFromServer from "./sellDiscountFactorsCrud";
import { sellDiscountFactorsSlice, callTypes } from "./sellDiscountFactorsSlice";
const { actions } = sellDiscountFactorsSlice;
export const fetchSellDiscountFactors = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellDiscountFactors(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellDiscountFactorsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDiscountFactors";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellDiscountFactor = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellDiscountFactorFetched({ sellDiscountFactorForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellDiscountFactorById(id)  
    .then((response) => {
      const sellDiscountFactor = response.data;
      dispatch(actions.sellDiscountFactorFetched({ sellDiscountFactorForEdit: sellDiscountFactor }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDiscountFactor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDiscountFactor = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDiscountFactor(id)  
    .then((response) => {
      dispatch(actions.sellDiscountFactorDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDiscountFactor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellDiscountFactor = (sellDiscountFactorForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellDiscountFactor(sellDiscountFactorForCreation)  
    .then((response) => {
      const sellDiscountFactor = response.data;
      dispatch(actions.sellDiscountFactorCreated(sellDiscountFactor));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellDiscountFactor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDiscountFactor = (sellDiscountFactor) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellDiscountFactor(sellDiscountFactor)  
    .then((response) => {
      dispatch(actions.sellDiscountFactorUpdated({ sellDiscountFactor }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDiscountFactor";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDiscountFactorsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellDiscountFactors(ids, status)  
    .then(() => {
      dispatch(actions.sellDiscountFactorsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDiscountFactors status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDiscountFactors = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDiscountFactors(ids)  
    .then(() => {
      dispatch(actions.sellDiscountFactorsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDiscountFactors";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 