import * as requestFromServer from "./discountTypesCrud";
import { discountTypesSlice, callTypes } from "./discountTypesSlice";
const { actions } = discountTypesSlice;
export const fetchDiscountTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDiscountTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.discountTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find discountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchDiscountType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.discountTypeFetched({ discountTypeForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDiscountTypeById(id)
    .then((response) => {
      const discountType = response.data;
      dispatch(
        actions.discountTypeFetched({ discountTypeForEdit: discountType })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find discountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDiscountType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDiscountType(id)
    .then((response) => {
      dispatch(actions.discountTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete discountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createDiscountType = (discountTypeForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDiscountType(discountTypeForCreation)
    .then((response) => {
      const discountType = response.data;
      dispatch(actions.discountTypeCreated(discountType));
    })
    .catch((error) => {
      error.clientMessage = "Can't create discountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDiscountType = (id, discountType) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDiscountType(id, discountType)
    .then((response) => {
      dispatch(actions.discountTypeUpdated({ discountType }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update discountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateDiscountTypesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDiscountTypes(ids, status)
    .then(() => {
      dispatch(actions.discountTypesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update discountTypes status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteDiscountTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDiscountTypes(ids)
    .then(() => {
      dispatch(actions.discountTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete discountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
