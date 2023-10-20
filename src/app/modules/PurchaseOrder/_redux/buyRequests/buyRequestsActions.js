import * as requestFromServer from "./buyRequestsCrud";
import { buyRequestsSlice, callTypes } from "./buyRequestsSlice";
const { actions } = buyRequestsSlice;
export const fetchBuyRequests = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBuyRequests(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.buyRequestsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find buyRequests";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBuyRequest = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.buyRequestFetched({ buyRequestForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBuyRequestById(id)
    .then((response) => {
      const buyRequest = response.data;
      dispatch(actions.buyRequestFetched({ buyRequestForEdit: buyRequest }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find buyRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyRequest = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuyRequest(id)
    .then((response) => {
      dispatch(actions.buyRequestDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buyRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBuyRequest = (buyRequestForCreation, fnCallback) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBuyRequest(buyRequestForCreation)
    .then((response) => {
      const buyRequest = response.data;
      fnCallback(buyRequest);

      dispatch(actions.buyRequestCreated(buyRequest));

      return buyRequest;
    })
    .catch((error) => {
      error.clientMessage = "Can't create buyRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyRequest = (id, buyRequest, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBuyRequest(id, buyRequest)
    .then((response) => {
      fnCallback(buyRequest);

      dispatch(actions.buyRequestUpdated({ buyRequest }));
      return buyRequest;
    })
    .catch((error) => {
      error.clientMessage = "Can't update buyRequest";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyRequestsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBuyRequests(ids, status)
    .then(() => {
      dispatch(actions.buyRequestsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buyRequests status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyRequests = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuyRequests(ids)
    .then(() => {
      dispatch(actions.buyRequestsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buyRequests";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
