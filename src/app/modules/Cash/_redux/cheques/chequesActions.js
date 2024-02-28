import * as requestFromServer from "./chequesCrud";
import { chequesSlice, callTypes } from "./chequesSlice";
const { actions } = chequesSlice;
export const fetchCheques = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCheques(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.chequesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find cheques";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCheque = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.chequeFetched({ chequeForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getChequeById(id)
    .then((response) => {
      const cheque = response.data;
      dispatch(actions.chequeFetched({ chequeForEdit: cheque }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find cheque";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCheque = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCheque(id)
    .then((response) => {
      dispatch(actions.chequeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cheque";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCheque = (chequeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCheque(chequeForCreation)
    .then((response) => {
      const cheque = response.data;
      dispatch(actions.chequeCreated(cheque));
    })
    .catch((error) => {
      error.clientMessage = "Can't create cheque";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCheque = (cheque) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCheque(cheque)
    .then((response) => {
      dispatch(actions.chequeUpdated({ cheque }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cheque";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateChequesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCheques(ids, status)
    .then(() => {
      dispatch(actions.chequesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cheques status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCheques = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCheques(ids)
    .then(() => {
      dispatch(actions.chequesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cheques";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
