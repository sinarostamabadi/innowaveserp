
import * as requestFromServer from "./sellDocumentDetailsCrud";
import { sellDocumentDetailsSlice, callTypes } from "./sellDocumentDetailsSlice";
const { actions } = sellDocumentDetailsSlice;
export const fetchSellDocumentDetails = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findSellDocumentDetails(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.sellDocumentDetailsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocumentDetails";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchSellDocumentDetail = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.sellDocumentDetailFetched({ sellDocumentDetailForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getSellDocumentDetailById(id)  
    .then((response) => {
      const sellDocumentDetail = response.data;
      dispatch(actions.sellDocumentDetailFetched({ sellDocumentDetailForEdit: sellDocumentDetail }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find sellDocumentDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocumentDetail = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocumentDetail(id)  
    .then((response) => {
      dispatch(actions.sellDocumentDetailDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocumentDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createSellDocumentDetail = (sellDocumentDetailForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createSellDocumentDetail(sellDocumentDetailForCreation)  
    .then((response) => {
      const sellDocumentDetail = response.data;
      dispatch(actions.sellDocumentDetailCreated(sellDocumentDetail));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create sellDocumentDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocumentDetail = (sellDocumentDetail) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateSellDocumentDetail(sellDocumentDetail)  
    .then((response) => {
      dispatch(actions.sellDocumentDetailUpdated({ sellDocumentDetail }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocumentDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateSellDocumentDetailsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForSellDocumentDetails(ids, status)  
    .then(() => {
      dispatch(actions.sellDocumentDetailsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update sellDocumentDetails status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteSellDocumentDetails = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteSellDocumentDetails(ids)  
    .then(() => {
      dispatch(actions.sellDocumentDetailsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete sellDocumentDetails";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 