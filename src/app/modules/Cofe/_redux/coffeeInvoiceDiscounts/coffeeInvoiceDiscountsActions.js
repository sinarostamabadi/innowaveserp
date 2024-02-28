import * as requestFromServer from "./coffeeInvoiceDiscountsCrud";
import {
  coffeeInvoiceDiscountsSlice,
  callTypes,
} from "./coffeeInvoiceDiscountsSlice";
const { actions } = coffeeInvoiceDiscountsSlice;
export const fetchCoffeeInvoiceDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCoffeeInvoiceDiscounts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.coffeeInvoiceDiscountsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coffeeInvoiceDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCoffeeInvoiceDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.coffeeInvoiceDiscountFetched({
        coffeeInvoiceDiscountForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCoffeeInvoiceDiscountById(id)
    .then((response) => {
      const coffeeInvoiceDiscount = response.data;
      dispatch(
        actions.coffeeInvoiceDiscountFetched({
          coffeeInvoiceDiscountForEdit: coffeeInvoiceDiscount,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find coffeeInvoiceDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCoffeeInvoiceDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoffeeInvoiceDiscount(id)
    .then((response) => {
      dispatch(actions.coffeeInvoiceDiscountDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeInvoiceDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCoffeeInvoiceDiscount =
  (coffeeInvoiceDiscountForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createCoffeeInvoiceDiscount(coffeeInvoiceDiscountForCreation)
      .then((response) => {
        const coffeeInvoiceDiscount = response.data;
        dispatch(actions.coffeeInvoiceDiscountCreated(coffeeInvoiceDiscount));
      })
      .catch((error) => {
        error.clientMessage = "Can't create coffeeInvoiceDiscount";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateCoffeeInvoiceDiscount =
  (coffeeInvoiceDiscount) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateCoffeeInvoiceDiscount(coffeeInvoiceDiscount)
      .then((response) => {
        dispatch(
          actions.coffeeInvoiceDiscountUpdated({ coffeeInvoiceDiscount })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update coffeeInvoiceDiscount";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateCoffeeInvoiceDiscountsStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForCoffeeInvoiceDiscounts(ids, status)
      .then(() => {
        dispatch(actions.coffeeInvoiceDiscountsStatusUpdated({ ids, status }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update coffeeInvoiceDiscounts status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteCoffeeInvoiceDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCoffeeInvoiceDiscounts(ids)
    .then(() => {
      dispatch(actions.coffeeInvoiceDiscountsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete coffeeInvoiceDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
