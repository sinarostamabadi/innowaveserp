import * as requestFromServer from "./coffeeShopDiscountTypesCrud";
import {
  coffeeShopDiscountTypesSlice,
  callTypes,
} from "./coffeeShopDiscountTypesSlice";
const { actions } = coffeeShopDiscountTypesSlice;
export const fetchCoffeeShopDiscountTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCoffeeShopDiscountTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.coffeeShopDiscountTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coffeeShopDiscountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoffeeShopDiscountType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.coffeeShopDiscountTypeFetched({
        coffeeShopDiscountTypeForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCoffeeShopDiscountTypeById(id)
    .then((response) => {
      const coffeeShopDiscountType = response.data;
      dispatch(
        actions.coffeeShopDiscountTypeFetched({
          coffeeShopDiscountTypeForEdit: coffeeShopDiscountType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coffeeShopDiscountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeShopDiscountType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoffeeShopDiscountType(id)
    .then((response) => {
      dispatch(actions.coffeeShopDiscountTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeShopDiscountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCoffeeShopDiscountType =
  (coffeeShopDiscountTypeForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createCoffeeShopDiscountType(coffeeShopDiscountTypeForCreation)
      .then((response) => {
        const coffeeShopDiscountType = response.data;
        dispatch(actions.coffeeShopDiscountTypeCreated(coffeeShopDiscountType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create coffeeShopDiscountType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateCoffeeShopDiscountType =
  (coffeeShopDiscountType) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateCoffeeShopDiscountType(coffeeShopDiscountType)
      .then((response) => {
        dispatch(
          actions.coffeeShopDiscountTypeUpdated({ coffeeShopDiscountType })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update coffeeShopDiscountType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateCoffeeShopDiscountTypesStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForCoffeeShopDiscountTypes(ids, status)
      .then(() => {
        dispatch(actions.coffeeShopDiscountTypesStatusUpdated({ ids, status }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update coffeeShopDiscountTypes status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteCoffeeShopDiscountTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoffeeShopDiscountTypes(ids)
    .then(() => {
      dispatch(actions.coffeeShopDiscountTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeShopDiscountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
