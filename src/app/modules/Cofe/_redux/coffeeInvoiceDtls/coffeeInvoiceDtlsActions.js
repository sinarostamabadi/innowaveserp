
import * as requestFromServer from "./coffeeInvoiceDtlsCrud";
import { coffeeInvoiceDtlsSlice, callTypes } from "./coffeeInvoiceDtlsSlice";
const { actions } = coffeeInvoiceDtlsSlice;
export const fetchCoffeeInvoiceDtls = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCoffeeInvoiceDtls(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.coffeeInvoiceDtlsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coffeeInvoiceDtls";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoffeeInvoiceDtl = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.coffeeInvoiceDtlFetched({ coffeeInvoiceDtlForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCoffeeInvoiceDtlById(id)  
    .then((response) => {
      const coffeeInvoiceDtl = response.data;
      dispatch(actions.coffeeInvoiceDtlFetched({ coffeeInvoiceDtlForEdit: coffeeInvoiceDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coffeeInvoiceDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeInvoiceDtl = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoffeeInvoiceDtl(id)  
    .then((response) => {
      dispatch(actions.coffeeInvoiceDtlDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeInvoiceDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCoffeeInvoiceDtl = (coffeeInvoiceDtlForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCoffeeInvoiceDtl(coffeeInvoiceDtlForCreation)  
    .then((response) => {
      const coffeeInvoiceDtl = response.data;
      dispatch(actions.coffeeInvoiceDtlCreated(coffeeInvoiceDtl));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create coffeeInvoiceDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoffeeInvoiceDtl = (coffeeInvoiceDtl) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCoffeeInvoiceDtl(coffeeInvoiceDtl)  
    .then((response) => {
      dispatch(actions.coffeeInvoiceDtlUpdated({ coffeeInvoiceDtl }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coffeeInvoiceDtl";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoffeeInvoiceDtlsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCoffeeInvoiceDtls(ids, status)  
    .then(() => {
      dispatch(actions.coffeeInvoiceDtlsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coffeeInvoiceDtls status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeInvoiceDtls = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoffeeInvoiceDtls(ids)  
    .then(() => {
      dispatch(actions.coffeeInvoiceDtlsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeInvoiceDtls";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 