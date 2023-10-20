
import * as requestFromServer from "./coffeeInvoiceCostsCrud";
import { coffeeInvoiceCostsSlice, callTypes } from "./coffeeInvoiceCostsSlice";
const { actions } = coffeeInvoiceCostsSlice;
export const fetchCoffeeInvoiceCosts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCoffeeInvoiceCosts(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.coffeeInvoiceCostsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coffeeInvoiceCosts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoffeeInvoiceCost = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.coffeeInvoiceCostFetched({ coffeeInvoiceCostForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCoffeeInvoiceCostById(id)  
    .then((response) => {
      const coffeeInvoiceCost = response.data;
      dispatch(actions.coffeeInvoiceCostFetched({ coffeeInvoiceCostForEdit: coffeeInvoiceCost }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coffeeInvoiceCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeInvoiceCost = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoffeeInvoiceCost(id)  
    .then((response) => {
      dispatch(actions.coffeeInvoiceCostDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeInvoiceCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCoffeeInvoiceCost = (coffeeInvoiceCostForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCoffeeInvoiceCost(coffeeInvoiceCostForCreation)  
    .then((response) => {
      const coffeeInvoiceCost = response.data;
      dispatch(actions.coffeeInvoiceCostCreated(coffeeInvoiceCost));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create coffeeInvoiceCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoffeeInvoiceCost = (coffeeInvoiceCost) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCoffeeInvoiceCost(coffeeInvoiceCost)  
    .then((response) => {
      dispatch(actions.coffeeInvoiceCostUpdated({ coffeeInvoiceCost }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coffeeInvoiceCost";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoffeeInvoiceCostsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCoffeeInvoiceCosts(ids, status)  
    .then(() => {
      dispatch(actions.coffeeInvoiceCostsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coffeeInvoiceCosts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeInvoiceCosts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoffeeInvoiceCosts(ids)  
    .then(() => {
      dispatch(actions.coffeeInvoiceCostsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeInvoiceCosts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 