import * as requestFromServer from "./coffeeShopCostTypesCrud";
import {
  coffeeShopCostTypesSlice,
  callTypes,
} from "./coffeeShopCostTypesSlice";
const { actions } = coffeeShopCostTypesSlice;
export const fetchCoffeeShopCostTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCoffeeShopCostTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.coffeeShopCostTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coffeeShopCostTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoffeeShopCostType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.coffeeShopCostTypeFetched({
        coffeeShopCostTypeForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCoffeeShopCostTypeById(id)
    .then((response) => {
      const coffeeShopCostType = response.data;
      dispatch(
        actions.coffeeShopCostTypeFetched({
          coffeeShopCostTypeForEdit: coffeeShopCostType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coffeeShopCostType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeShopCostType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoffeeShopCostType(id)
    .then((response) => {
      dispatch(actions.coffeeShopCostTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeShopCostType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCoffeeShopCostType =
  (coffeeShopCostTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createCoffeeShopCostType(coffeeShopCostTypeForCreation)
      .then((response) => {
        const coffeeShopCostType = response.data;
        dispatch(actions.coffeeShopCostTypeCreated(coffeeShopCostType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create coffeeShopCostType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateCoffeeShopCostType = (coffeeShopCostType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCoffeeShopCostType(coffeeShopCostType)
    .then((response) => {
      dispatch(actions.coffeeShopCostTypeUpdated({ coffeeShopCostType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update coffeeShopCostType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCoffeeShopCostTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCoffeeShopCostTypes(ids, status)
    .then(() => {
      dispatch(actions.coffeeShopCostTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update coffeeShopCostTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeShopCostTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoffeeShopCostTypes(ids)
    .then(() => {
      dispatch(actions.coffeeShopCostTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeShopCostTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
