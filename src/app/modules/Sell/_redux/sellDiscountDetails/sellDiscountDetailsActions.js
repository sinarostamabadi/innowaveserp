
import * as requestFromServer from "./sellDiscountDetailsCrud";
import { sellDiscountDetailsSlice, callTypes } from "./sellDiscountDetailsSlice";
const { actions } = sellDiscountDetailsSlice;
export const fetchSellDiscountDetails = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellDiscountDetails(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellDiscountDetailsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDiscountDetails";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellDiscountDetail = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellDiscountDetailFetched({ sellDiscountDetailForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellDiscountDetailById(id)  
    .then((response) => {
      const sellDiscountDetail = response.data;
      dispatch(actions.sellDiscountDetailFetched({ sellDiscountDetailForEdit: sellDiscountDetail }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDiscountDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDiscountDetail = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDiscountDetail(id)  
    .then((response) => {
      dispatch(actions.sellDiscountDetailDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDiscountDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellDiscountDetail = (sellDiscountDetailForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellDiscountDetail(sellDiscountDetailForCreation)  
    .then((response) => {
      const sellDiscountDetail = response.data;
      dispatch(actions.sellDiscountDetailCreated(sellDiscountDetail));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellDiscountDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDiscountDetail = (sellDiscountDetail) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellDiscountDetail(sellDiscountDetail)  
    .then((response) => {
      dispatch(actions.sellDiscountDetailUpdated({ sellDiscountDetail }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDiscountDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDiscountDetailsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellDiscountDetails(ids, status)  
    .then(() => {
      dispatch(actions.sellDiscountDetailsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDiscountDetails status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDiscountDetails = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDiscountDetails(ids)  
    .then(() => {
      dispatch(actions.sellDiscountDetailsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDiscountDetails";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 