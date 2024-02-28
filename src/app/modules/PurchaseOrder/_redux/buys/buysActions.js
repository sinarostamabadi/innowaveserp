import * as requestFromServer from "./buysCrud";
import { buysSlice, callTypes } from "./buysSlice";
const { actions } = buysSlice;
export const fetchBuys = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBuys(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.buysFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find buys";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBuy = (id, fnCallback) => (dispatch) => {
  if (!id) {
    return dispatch(actions.buyFetched({ buyForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBuyById(id)
    .then((response) => {
      const buy = response.data;
      !!fnCallback && fnCallback(buy);

      dispatch(actions.buyFetched({ buyForEdit: buy }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find buy";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuy = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuy(id)
    .then((response) => {
      dispatch(actions.buyDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buy";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBuy = (buyForCreation, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBuy(buyForCreation)
    .then((response) => {
      const buy = response.data;
      fnCallback(buy);

      dispatch(actions.buyCreated(buy));
    })
    .catch((error) => {
      error.clientMessage = "Can't create buy";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuy = (id, buy, fnCallback) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBuy(id, buy)
    .then((response) => {
      fnCallback(buy);
      dispatch(actions.buyUpdated({ buy }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buy";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBuysStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBuys(ids, status)
    .then(() => {
      dispatch(actions.buysStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update buys status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBuys = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBuys(ids)
    .then(() => {
      dispatch(actions.buysDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete buys";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
