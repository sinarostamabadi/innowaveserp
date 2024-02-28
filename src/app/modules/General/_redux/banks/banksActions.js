import * as requestFromServer from "./banksCrud";
import { banksSlice, callTypes } from "./banksSlice";

const { actions } = banksSlice;
export const fetchBanks = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findBanks(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.banksFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find banks";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchBank = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bankFetched({ bankForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBankById(id)
    .then((response) => {
      const bank = response.data;
      dispatch(actions.bankFetched({ bankForEdit: bank }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find bank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBank = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBank(id)
    .then((response) => {
      dispatch(actions.bankDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete bank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createBank = (bankForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBank(bankForCreation)
    .then((response) => {
      const bank = response.data;
      dispatch(actions.bankCreated(bank));
    })
    .catch((error) => {
      error.clientMessage = "Can't create bank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBank = (id, bank) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBank(id, bank)
    .then((response) => {
      dispatch(actions.bankUpdated({ bank }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update bank";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateBanksStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBanks(ids, status)
    .then(() => {
      dispatch(actions.banksStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update banks status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteBanks = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBanks(ids)
    .then(() => {
      dispatch(actions.banksDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete banks";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
