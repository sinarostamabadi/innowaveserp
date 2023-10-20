
import * as requestFromServer from "./sellPricingDetailsCrud";
import { sellPricingDetailsSlice, callTypes } from "./sellPricingDetailsSlice";
const { actions } = sellPricingDetailsSlice;
export const fetchSellPricingDetails = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellPricingDetails(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellPricingDetailsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellPricingDetails";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellPricingDetail = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellPricingDetailFetched({ sellPricingDetailForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellPricingDetailById(id)  
    .then((response) => {
      const sellPricingDetail = response.data;
      dispatch(actions.sellPricingDetailFetched({ sellPricingDetailForEdit: sellPricingDetail }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellPricingDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellPricingDetail = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellPricingDetail(id)  
    .then((response) => {
      dispatch(actions.sellPricingDetailDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellPricingDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellPricingDetail = (sellPricingDetailForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellPricingDetail(sellPricingDetailForCreation)  
    .then((response) => {
      const sellPricingDetail = response.data;
      dispatch(actions.sellPricingDetailCreated(sellPricingDetail));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellPricingDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellPricingDetail = (sellPricingDetail) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellPricingDetail(sellPricingDetail)  
    .then((response) => {
      dispatch(actions.sellPricingDetailUpdated({ sellPricingDetail }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellPricingDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellPricingDetailsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellPricingDetails(ids, status)  
    .then(() => {
      dispatch(actions.sellPricingDetailsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellPricingDetails status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellPricingDetails = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellPricingDetails(ids)  
    .then(() => {
      dispatch(actions.sellPricingDetailsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellPricingDetails";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 