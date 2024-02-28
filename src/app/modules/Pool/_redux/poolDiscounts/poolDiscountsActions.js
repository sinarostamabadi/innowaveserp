import * as requestFromServer from "./poolDiscountsCrud";
import { poolDiscountsSlice, callTypes } from "./poolDiscountsSlice";
const { actions } = poolDiscountsSlice;
export const fetchPoolDiscounts = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findPoolDiscounts(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.poolDiscountsFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find poolDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchPoolDiscount = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.poolDiscountFetched({ poolDiscountForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getPoolDiscountById(id)
    .then((response) => {
      const poolDiscount = response.data;
      dispatch(
        actions.poolDiscountFetched({ poolDiscountForEdit: poolDiscount })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find poolDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolDiscount = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoolDiscount(id)
    .then((response) => {
      dispatch(actions.poolDiscountDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poolDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createPoolDiscount = (poolDiscountForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createPoolDiscount(poolDiscountForCreation)
    .then((response) => {
      const poolDiscount = response.data;
      dispatch(actions.poolDiscountCreated(poolDiscount));
    })
    .catch((error) => {
      error.clientMessage = "Can't create poolDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePoolDiscount = (poolDiscount) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updatePoolDiscount(poolDiscount)
    .then((response) => {
      dispatch(actions.poolDiscountUpdated({ poolDiscount }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poolDiscount";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updatePoolDiscountsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForPoolDiscounts(ids, status)
    .then(() => {
      dispatch(actions.poolDiscountsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update poolDiscounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deletePoolDiscounts = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deletePoolDiscounts(ids)
    .then(() => {
      dispatch(actions.poolDiscountsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete poolDiscounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
