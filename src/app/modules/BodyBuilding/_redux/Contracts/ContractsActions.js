
import * as requestFromServer from "./ContractsCrud";
import { contractsSlice, callTypes } from "./ContractsSlice";
const { actions } = contractsSlice;
export const fetchContracts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findContracts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.contractsFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find contracts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchContract = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.contractFetched({ contractForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getContractById(id)
    .then((response) => {
      const contract = response.data;
      dispatch(actions.contractFetched({ contractForEdit: contract }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find contract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteContract = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteContract(id)
    .then((response) => {
      dispatch(actions.contractDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete contract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createContract = (contractForCreation, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createContract(contractForCreation)
    .then((response) => {
      const contract = response.data;
      fnCallBack(contract);
      
      dispatch(actions.contractCreated(contract));

      return contract;
    })
    .catch((error) => {
      error.clientMessage = "Can't create contract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateContract = (id, contract, fnCallBack) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateContract(id, contract)
    .then((response) => {
      fnCallBack(contract);

      dispatch(actions.contractUpdated({ contract }));

      return contract;
    })
    .catch((error) => {
      error.clientMessage = "Can't update contract";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateContractsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForContracts(ids, status)
    .then(() => {
      dispatch(actions.contractsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update contracts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteContracts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteContracts(ids)
    .then(() => {
      dispatch(actions.contractsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete contracts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 