import * as requestFromServer from "./walletsCrud";
import { walletsSlice, callTypes } from "./walletsSlice";
const { actions } = walletsSlice;
export const fetchWallets = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findWallets(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.walletsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find wallets";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchWallet = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.walletFetched({ walletForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getWalletById(id)  
    .then((response) => {
      const wallet = response.data;
      dispatch(actions.walletFetched({ walletForEdit: wallet }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find wallet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteWallet = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteWallet(id)  
    .then((response) => {
      dispatch(actions.walletDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete wallet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createWallet = (walletForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createWallet(walletForCreation)  
    .then((response) => {
      const wallet = response.data;
      dispatch(actions.walletCreated(wallet));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create wallet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateWallet = (wallet) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateWallet(wallet)  
    .then((response) => {
      console.log("response =>" , response);
      dispatch(actions.walletUpdated({ wallet }));
    })  
    .catch((error) => {
      console.log("error =>" , error);
      error.clientMessage = "Can't update wallet";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateWalletsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForWallets(ids, status)  
    .then(() => {
      dispatch(actions.walletsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update wallets status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteWallets = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteWallets(ids)  
    .then(() => {
      dispatch(actions.walletsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete wallets";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
}; 
