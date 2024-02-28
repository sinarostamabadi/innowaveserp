import * as requestFromServer from "./addressesCrud";
import { addressesSlice, callTypes } from "./addressesSlice";
const { actions } = addressesSlice;
export const fetchAddresses = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAddresses(queryParams)
    .then((response) => {
      const { items, totalCount } = response.data;
      dispatch(
        actions.addressesFetched({ totalCount: totalCount, entities: items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find addresses";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchAddress = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.addressFetched({ addressForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAddressById(id)
    .then((response) => {
      const address = response.data;
      dispatch(actions.addressFetched({ addressForEdit: address }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find address";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAddress = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAddress(id)
    .then((response) => {
      dispatch(actions.addressDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete address";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const createAddress = (addressForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createAddress(addressForCreation)
    .then((response) => {
      const address = response.data;
      dispatch(actions.addressCreated(address));
    })
    .catch((error) => {
      error.clientMessage = "Can't create address";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateAddress = (address) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAddress(address)
    .then((response) => {
      dispatch(actions.addressUpdated({ address }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update address";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateAddressesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAddresses(ids, status)
    .then(() => {
      dispatch(actions.addressesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update addresses status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteAddresses = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAddresses(ids)
    .then(() => {
      dispatch(actions.addressesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete addresses";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
