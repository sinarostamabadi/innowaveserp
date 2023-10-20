
import * as requestFromServer from "./sellPricingCrud";
import { sellPricingSlice, callTypes } from "./sellPricingSlice";
const { actions } = sellPricingSlice;
export const fetchSellPricings = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellPricing(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellPricingsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellPricing";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellPricing = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellPricingFetched({ sellPricingForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellPricingById(id)  
    .then((response) => {
      const sellPricing = response.data;
      console.log("sellPricing > ", sellPricing);
      dispatch(actions.sellPricingFetched({ sellPricingForEdit: sellPricing }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellPricing = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellPricing(id)  
    .then((response) => {
      dispatch(actions.sellPricingDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellPricing = (sellPricing, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellPricing(sellPricing)  
    .then((response) => {
      const sellPricing = response.data;
      fnCallback(sellPricing);
      dispatch(actions.sellPricingCreated(sellPricing));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellPricing = (id, sellPricing, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellPricing(id, sellPricing)  
    .then((response) => {
      fnCallback(response);
      dispatch(actions.sellPricingUpdated({ sellPricing }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellPricingStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellPricing(ids, status)  
    .then(() => {
      dispatch(actions.sellPricingStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellPricing status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellPricings = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellPricings(ids)  
    .then(() => {
      dispatch(actions.sellPricingDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellPricing";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 