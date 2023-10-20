
import * as requestFromServer from "./buyRequestDetailsCrud";
import { buyRequestDetailsSlice, callTypes } from "./buyRequestDetailsSlice";
const { actions } = buyRequestDetailsSlice;
export const fetchBuyRequestDetails = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findBuyRequestDetails(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.buyRequestDetailsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find buyRequestDetails";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBuyRequestDetail = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.buyRequestDetailFetched({ buyRequestDetailForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getBuyRequestDetailById(id)  
    .then((response) => {
      const buyRequestDetail = response.data;
      dispatch(actions.buyRequestDetailFetched({ buyRequestDetailForEdit: buyRequestDetail }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find buyRequestDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyRequestDetail = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBuyRequestDetail(id)  
    .then((response) => {
      dispatch(actions.buyRequestDetailDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete buyRequestDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBuyRequestDetail = (buyRequestDetailForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createBuyRequestDetail(buyRequestDetailForCreation)  
    .then((response) => {
      const buyRequestDetail = response.data;
      dispatch(actions.buyRequestDetailCreated(buyRequestDetail));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create buyRequestDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyRequestDetail = (buyRequestDetail) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateBuyRequestDetail(buyRequestDetail)  
    .then((response) => {
      dispatch(actions.buyRequestDetailUpdated({ buyRequestDetail }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update buyRequestDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyRequestDetailsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForBuyRequestDetails(ids, status)  
    .then(() => {
      dispatch(actions.buyRequestDetailsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update buyRequestDetails status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyRequestDetails = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteBuyRequestDetails(ids)  
    .then(() => {
      dispatch(actions.buyRequestDetailsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete buyRequestDetails";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 