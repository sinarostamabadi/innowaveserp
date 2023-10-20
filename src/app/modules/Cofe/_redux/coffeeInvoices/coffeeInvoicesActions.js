
import * as requestFromServer from "./coffeeInvoicesCrud";
import { coffeeInvoicesSlice, callTypes } from "./coffeeInvoicesSlice";
const { actions } = coffeeInvoicesSlice;
export const fetchCoffeeInvoices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCoffeeInvoices(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.coffeeInvoicesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coffeeInvoices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoffeeInvoice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.coffeeInvoiceFetched({ coffeeInvoiceForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCoffeeInvoiceById(id)  
    .then((response) => {
      const coffeeInvoice = response.data;
      dispatch(actions.coffeeInvoiceFetched({ coffeeInvoiceForEdit: coffeeInvoice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coffeeInvoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeInvoice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoffeeInvoice(id)  
    .then((response) => {
      dispatch(actions.coffeeInvoiceDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeInvoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCoffeeInvoice = (coffeeInvoiceForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCoffeeInvoice(coffeeInvoiceForCreation)  
    .then((response) => {
      const coffeeInvoice = response.data;
      dispatch(actions.coffeeInvoiceCreated(coffeeInvoice));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create coffeeInvoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoffeeInvoice = (coffeeInvoice) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCoffeeInvoice(coffeeInvoice)  
    .then((response) => {
      dispatch(actions.coffeeInvoiceUpdated({ coffeeInvoice }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coffeeInvoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoffeeInvoicesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCoffeeInvoices(ids, status)  
    .then(() => {
      dispatch(actions.coffeeInvoicesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coffeeInvoices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeInvoices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoffeeInvoices(ids)  
    .then(() => {
      dispatch(actions.coffeeInvoicesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeInvoices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 