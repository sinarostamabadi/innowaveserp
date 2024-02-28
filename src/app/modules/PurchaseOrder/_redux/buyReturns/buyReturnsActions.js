import * as requestFromServer from "./buyReturnsCrud";
import { buyReturnsSlice, callTypes } from "./buyReturnsSlice";
const { actions } = buyReturnsSlice;
export const fetchBuyReturns = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBuyReturns(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.buyReturnsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find buyReturns";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBuyReturn = (id, fnCallback) => (dispatch) => {
  if (!id) {
    return dispatch(actions.buyReturnFetched({ buyReturnForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBuyReturnById(id)
    .then((response) => {
      const buyReturn = response.data;
      !!fnCallback && fnCallback(buyReturn);

      dispatch(actions.buyReturnFetched({ buyReturnForEdit: buyReturn }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find buyReturn";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyReturn = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuyReturn(id)
    .then((response) => {
      dispatch(actions.buyReturnDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buyReturn";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBuyReturn =
  (buyReturnForCreation, fnCallback) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createBuyReturn(buyReturnForCreation)
      .then((response) => {
        const buyReturn = response.data;
        fnCallback(buyReturn);

        dispatch(actions.buyReturnCreated(buyReturn));
      })
      .catch((error) => {
        error.clientMessage = "Can't create buyReturn";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateBuyReturn = (id, buyReturn, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBuyReturn(id, buyReturn)
    .then((response) => {
      fnCallback(buyReturn);
      dispatch(actions.buyReturnUpdated({ buyReturn }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buyReturn";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuyReturnsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBuyReturns(ids, status)
    .then(() => {
      dispatch(actions.buyReturnsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buyReturns status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuyReturns = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuyReturns(ids)
    .then(() => {
      dispatch(actions.buyReturnsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buyReturns";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
