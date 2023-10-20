import * as requestFromServer from "./coffeeShopsCrud";
import { coffeeShopsSlice, callTypes } from "./coffeeShopsSlice";
const { actions } = coffeeShopsSlice;
export const fetchCoffeeShops = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCoffeeShops(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.coffeeShopsFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coffeeShops";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoffeeShop = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.coffeeShopFetched({ coffeeShopForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCoffeeShopById(id)  
    .then((response) => {
      const coffeeShop = response.data;
      dispatch(actions.coffeeShopFetched({ coffeeShopForEdit: coffeeShop }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find coffeeShop";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeShop = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoffeeShop(id)  
    .then((response) => {
      dispatch(actions.coffeeShopDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeShop";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCoffeeShop = (coffeeShopForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCoffeeShop(coffeeShopForCreation)  
    .then((response) => {
      const coffeeShop = response.data;
      dispatch(actions.coffeeShopCreated(coffeeShop));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create coffeeShop";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoffeeShop = (coffeeShop) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCoffeeShop(coffeeShop)  
    .then((response) => {
      dispatch(actions.coffeeShopUpdated({ coffeeShop }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coffeeShop";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoffeeShopsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCoffeeShops(ids, status)  
    .then(() => {
      dispatch(actions.coffeeShopsStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update coffeeShops status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeShops = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCoffeeShops(ids)  
    .then(() => {
      dispatch(actions.coffeeShopsDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeShops";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 
