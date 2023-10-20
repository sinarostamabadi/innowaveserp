import * as requestFromServer from "./RestaurantInvoicesCrud";
import { restaurantInvoicesSlice, callTypes } from "./RestaurantInvoicesSlice";
import moment from "jalali-moment";

const { actions } = restaurantInvoicesSlice;
export const fetchRestaurantInvoices = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRestaurantInvoices(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantInvoicesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantInvoices";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantInvoice = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.restaurantInvoiceFetched({ restaurantInvoiceForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRestaurantInvoiceById(id)
    .then((response) => {
      const restaurantInvoice = response.data;

      const dr = moment(restaurantInvoice.InvoiceDate, "YYYY/MM/DD")
        .locale(process.env.REACT_APP_DATE)
        .format("YYYY/MM/DD")
        .split("/");
      restaurantInvoice["InvoiceDateObj"] = {
        day: +dr[2],
        month: +dr[1],
        year: +dr[0],
      };

      dispatch(
        actions.restaurantInvoiceFetched({
          restaurantInvoiceForEdit: restaurantInvoice,
        })
      );
      return restaurantInvoice;
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantInvoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantInvoice = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantInvoice(id)
    .then((response) => {
      dispatch(actions.restaurantInvoiceDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantInvoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantInvoice = (restaurantInvoiceForCreation, fn) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createRestaurantInvoice(restaurantInvoiceForCreation)
    .then((response) => {
      const restaurantInvoice = response.data;
      fn(restaurantInvoice);
      
      dispatch(actions.restaurantInvoiceCreated(restaurantInvoice));

      return restaurantInvoice;
    })
    .catch((error) => {
      error.clientMessage = "Can't create restaurantInvoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));

      throw error;
    });
};
export const updateRestaurantInvoice = (id, restaurantInvoice) => (
  dispatch
) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateRestaurantInvoice(id, restaurantInvoice)
    .then((response) => {
      dispatch(actions.restaurantInvoiceUpdated({ restaurantInvoice }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurantInvoice";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateRestaurantInvoicesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRestaurantInvoices(ids, status)
    .then(() => {
      dispatch(actions.restaurantInvoicesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurantInvoices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const updateRestaurantInvoiceStatus = (id, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForRestaurantInvoice(id, status)
    .then(() => {
      dispatch(actions.restaurantInvoiceStatusUpdated({ id, status }));

      return;
    })
    .catch((error) => {
      error.clientMessage = "Can't update restaurantInvoices status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error.clientMessage;
    });
};
export const deleteRestaurantInvoices = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantInvoices(ids)
    .then(() => {
      dispatch(actions.restaurantInvoicesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantInvoices";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
