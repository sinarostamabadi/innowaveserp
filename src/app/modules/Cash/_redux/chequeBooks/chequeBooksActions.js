import * as requestFromServer from "./chequeBooksCrud";
import { chequeBooksSlice, callTypes } from "./chequeBooksSlice";
const { actions } = chequeBooksSlice;
export const fetchChequeBooks = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .find(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.chequeBooksFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find chequeBooks";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchChequeBook = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.chequeBookFetched({ chequeBookForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getById(id)
    .then((response) => {
      const chequeBook = response.data;
      dispatch(actions.chequeBookFetched({ chequeBookForEdit: chequeBook }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find chequeBook";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const remove = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .remove(id)
    .then((response) => {
      dispatch(actions.chequeBookDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete chequeBook";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const create = (chequeBookForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .create(chequeBookForCreation)
    .then((response) => {
      const chequeBook = response.data;
      dispatch(actions.chequeBookCreated(chequeBook));
    })
    .catch((error) => {
      error.clientMessage = "Can't create chequeBook";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const update = (id, chequeBook) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .update(id, chequeBook)
    .then((response) => {
      dispatch(actions.chequeBookUpdated({ chequeBook }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update chequeBook";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const removeIds = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .removeIds(ids)
    .then(() => {
      dispatch(actions.chequeBooksDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete chequeBooks";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
