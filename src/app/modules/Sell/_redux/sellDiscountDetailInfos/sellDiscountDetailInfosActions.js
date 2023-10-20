
import * as requestFromServer from "./sellDiscountDetailInfosCrud";
import { sellDiscountDetailInfosSlice, callTypes } from "./sellDiscountDetailInfosSlice";
const { actions } = sellDiscountDetailInfosSlice;
export const fetchSellDiscountDetailInfos = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellDiscountDetailInfos(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellDiscountDetailInfosFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDiscountDetailInfos";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellDiscountDetailInfo = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellDiscountDetailInfoFetched({ sellDiscountDetailInfoForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellDiscountDetailInfoById(id)  
    .then((response) => {
      const sellDiscountDetailInfo = response.data;
      dispatch(actions.sellDiscountDetailInfoFetched({ sellDiscountDetailInfoForEdit: sellDiscountDetailInfo }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDiscountDetailInfo";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDiscountDetailInfo = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDiscountDetailInfo(id)  
    .then((response) => {
      dispatch(actions.sellDiscountDetailInfoDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDiscountDetailInfo";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellDiscountDetailInfo = (sellDiscountDetailInfoForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellDiscountDetailInfo(sellDiscountDetailInfoForCreation)  
    .then((response) => {
      const sellDiscountDetailInfo = response.data;
      dispatch(actions.sellDiscountDetailInfoCreated(sellDiscountDetailInfo));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellDiscountDetailInfo";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDiscountDetailInfo = (sellDiscountDetailInfo) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellDiscountDetailInfo(sellDiscountDetailInfo)  
    .then((response) => {
      dispatch(actions.sellDiscountDetailInfoUpdated({ sellDiscountDetailInfo }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDiscountDetailInfo";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDiscountDetailInfosStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellDiscountDetailInfos(ids, status)  
    .then(() => {
      dispatch(actions.sellDiscountDetailInfosStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDiscountDetailInfos status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDiscountDetailInfos = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDiscountDetailInfos(ids)  
    .then(() => {
      dispatch(actions.sellDiscountDetailInfosDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDiscountDetailInfos";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 