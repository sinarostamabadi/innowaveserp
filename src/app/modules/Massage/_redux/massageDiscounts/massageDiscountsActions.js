import * as requestFromServer from "./massageDiscountsCrud";
import { massageDiscountsSlice, callTypes } from "./massageDiscountsSlice";
const { actions } = massageDiscountsSlice;
export const fetchMassageDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findMassageDiscounts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.massageDiscountsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find massageDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchMassageDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.massageDiscountFetched({ massageDiscountForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getMassageDiscountById(id)
    .then((response) => {
      const massageDiscount = response.data;
      dispatch(
        actions.massageDiscountFetched({
          massageDiscountForEdit: massageDiscount,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find massageDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMassageDiscount(id)
    .then((response) => {
      dispatch(actions.massageDiscountDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete massageDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createMassageDiscount =
  (massageDiscountForCreation) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createMassageDiscount(massageDiscountForCreation)
      .then((response) => {
        const massageDiscount = response.data;
        dispatch(actions.massageDiscountCreated(massageDiscount));
      })
      .catch((error) => {
        error.clientMessage = "Can't create massageDiscount";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateMassageDiscount = (massageDiscount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateMassageDiscount(massageDiscount)
    .then((response) => {
      dispatch(actions.massageDiscountUpdated({ massageDiscount }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update massageDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateMassageDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForMassageDiscounts(ids, status)
    .then(() => {
      dispatch(actions.massageDiscountsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update massageDiscounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteMassageDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteMassageDiscounts(ids)
    .then(() => {
      dispatch(actions.massageDiscountsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete massageDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
