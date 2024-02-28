import * as requestFromServer from "./cashDocumentsCrud";
import { cashDocumentsSlice, callTypes } from "./cashDocumentsSlice";
const { actions } = cashDocumentsSlice;
export const fetchCashDocuments = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .find(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.cashDocumentsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find cashDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCashDocument = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.cashDocumentFetched({ cashDocumentForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getById(id)
    .then((response) => {
      const cashDocument = response.data;
      dispatch(
        actions.cashDocumentFetched({ cashDocumentForEdit: cashDocument })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find cashDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const remove = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .remove(id)
    .then((response) => {
      dispatch(actions.cashDocumentDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cashDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const create = (cashDocumentForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .create(cashDocumentForCreation)
    .then((response) => {
      const cashDocument = response.data;
      dispatch(actions.cashDocumentCreated(cashDocument));
    })
    .catch((error) => {
      error.clientMessage = "Can't create cashDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const update = (id, cashDocument) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .update(id, cashDocument)
    .then((response) => {
      dispatch(actions.cashDocumentUpdated({ cashDocument }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cashDocument";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};

export const removeIds = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .removeIds(ids)
    .then(() => {
      dispatch(actions.cashDocumentsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cashDocuments";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
