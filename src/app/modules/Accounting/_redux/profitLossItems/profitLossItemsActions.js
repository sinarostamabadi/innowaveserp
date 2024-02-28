import * as requestFromServer from "./profitLossItemsCrud";
import { profitLossItemsSlice, callTypes } from "./profitLossItemsSlice";
const { actions } = profitLossItemsSlice;
export const fetchProfitLossItems = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findProfitLossItems(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.profitLossItemsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find profitLossItems";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchProfitLossItem = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.profitLossItemFetched({ profitLossItemForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getProfitLossItemById(id)
    .then((response) => {
      const profitLossItem = response.data;
      dispatch(
        actions.profitLossItemFetched({ profitLossItemForEdit: profitLossItem })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find profitLossItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProfitLossItem = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProfitLossItem(id)
    .then((response) => {
      dispatch(actions.profitLossItemDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete profitLossItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createProfitLossItem =
  (profitLossItemForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createProfitLossItem(profitLossItemForCreation)
      .then((response) => {
        const profitLossItem = response.data;
        dispatch(actions.profitLossItemCreated(profitLossItem));
      })
      .catch((error) => {
        error.clientMessage = "Can't create profitLossItem";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateProfitLossItem = (profitLossItem) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateProfitLossItem(profitLossItem)
    .then((response) => {
      dispatch(actions.profitLossItemUpdated({ profitLossItem }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update profitLossItem";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateProfitLossItemsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForProfitLossItems(ids, status)
    .then(() => {
      dispatch(actions.profitLossItemsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update profitLossItems status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteProfitLossItems = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteProfitLossItems(ids)
    .then(() => {
      dispatch(actions.profitLossItemsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete profitLossItems";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
