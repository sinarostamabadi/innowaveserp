import * as requestFromServer from "./bankCardsCrud";
import { bankCardsSlice, callTypes } from "./bankCardsSlice";
const { actions } = bankCardsSlice;
export const fetchBankCards = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .find(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.bankCardsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find bankCards";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBankCard = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bankCardFetched({ bankCardForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getById(id)
    .then((response) => {
      const bankCard = response.data;
      dispatch(actions.bankCardFetched({ bankCardForEdit: bankCard }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find bankCard";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const remove = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .remove(id)
    .then((response) => {
      dispatch(actions.bankCardDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bankCard";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const create = (bankCardForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .create(bankCardForCreation)
    .then((response) => {
      const bankCard = response.data;
      dispatch(actions.bankCardCreated(bankCard));
    })
    .catch((error) => {
      error.clientMessage = "Can't create bankCard";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const update = (id, bankCard) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .update(id, bankCard)
    .then((response) => {
      dispatch(actions.bankCardUpdated({ bankCard }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update bankCard";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const removeIds = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .removeIds(ids)
    .then(() => {
      dispatch(actions.bankCardsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bankCards";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
