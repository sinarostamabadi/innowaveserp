import * as requestFromServer from "./buyDetailsCrud";
import { buyDetailsSlice, callTypes } from "./buyDetailsSlice";
const { actions } = buyDetailsSlice;
export const fetchBuyDetails = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBuyDetails(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.buyDetailsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find buyDetails";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBuyDetail = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.buyDetailFetched({ buyDetailForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBuyDetailById(id)
    .then((response) => {
      const buyDetail = response.data;
      dispatch(actions.buyDetailFetched({ buyDetailForEdit: buyDetail }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find buyDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyDetail = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuyDetail(id)
    .then((response) => {
      dispatch(actions.buyDetailDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buyDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBuyDetail = (buyDetailForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBuyDetail(buyDetailForCreation)
    .then((response) => {
      const buyDetail = response.data;
      dispatch(actions.buyDetailCreated(buyDetail));
    })
    .catch((error) => {
      error.clientMessage = "Can't create buyDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyDetail = (buyDetail) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBuyDetail(buyDetail)
    .then((response) => {
      dispatch(actions.buyDetailUpdated({ buyDetail }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buyDetail";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyDetailsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBuyDetails(ids, status)
    .then(() => {
      dispatch(actions.buyDetailsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buyDetails status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyDetails = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuyDetails(ids)
    .then(() => {
      dispatch(actions.buyDetailsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buyDetails";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
