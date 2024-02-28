import * as requestFromServer from "./RestaurantDiscountTypesCrud";
import {
  restaurantDiscountTypesSlice,
  callTypes,
} from "./RestaurantDiscountTypesSlice";
import moment from "jalali-moment";
import { EnToFaObjDate } from "../../../../../core/_helpers";

const { actions } = restaurantDiscountTypesSlice;
export const fetchRestaurantDiscountTypes = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findRestaurantDiscountTypes(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.restaurantDiscountTypesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantDiscountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchRestaurantDiscountType = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.restaurantDiscountTypeFetched({
        restaurantDiscountTypeForEdit: undefined,
      })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getRestaurantDiscountTypeById(id)
    .then((response) => {
      const restaurantDiscountType = response.data;
      if (!!restaurantDiscountType) {
        restaurantDiscountType.Price = !!restaurantDiscountType.Price
          ? restaurantDiscountType.Price
          : "";
        restaurantDiscountType.DiscountPercent =
          !!restaurantDiscountType.DiscountPercent
            ? restaurantDiscountType.DiscountPercent
            : "";

        restaurantDiscountType["FromTimeObj"] = restaurantDiscountType.FromTime;
        restaurantDiscountType["ToTimeObj"] = restaurantDiscountType.ToTime;
        restaurantDiscountType["FromTimeObj"] = moment(
          restaurantDiscountType["FromTimeObj"],
          "hh:mm:ss"
        );
        restaurantDiscountType["ToTimeObj"] = moment(
          restaurantDiscountType["ToTimeObj"],
          "hh:mm:ss"
        );

        restaurantDiscountType["FromDateObj"] = EnToFaObjDate(
          restaurantDiscountType.FromDate
        );
        restaurantDiscountType["ToDateObj"] = EnToFaObjDate(
          restaurantDiscountType.ToDate
        );
      }

      dispatch(
        actions.restaurantDiscountTypeFetched({
          restaurantDiscountTypeForEdit: restaurantDiscountType,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find restaurantDiscountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteRestaurantDiscountType = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantDiscountType(id)
    .then((response) => {
      dispatch(actions.restaurantDiscountTypeDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantDiscountType";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createRestaurantDiscountType =
  (restaurantDiscountTypeForCreation, fnCallback) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .createRestaurantDiscountType(restaurantDiscountTypeForCreation)
      .then((response) => {
        const restaurantDiscountType = response.data;
        fnCallback();
        dispatch(actions.restaurantDiscountTypeCreated(restaurantDiscountType));
      })
      .catch((error) => {
        error.clientMessage = "Can't create restaurantDiscountType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateRestaurantDiscountType =
  (id, restaurantDiscountType, fnCallback) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateRestaurantDiscountType(id, restaurantDiscountType)
      .then((response) => {
        fnCallback();
        dispatch(
          actions.restaurantDiscountTypeUpdated({ restaurantDiscountType })
        );
      })
      .catch((error) => {
        error.clientMessage = "Can't update restaurantDiscountType";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
        throw error;
      });
  };
export const updateRestaurantDiscountTypesStatus =
  (ids, status) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
      .updateStatusForRestaurantDiscountTypes(ids, status)
      .then(() => {
        dispatch(actions.restaurantDiscountTypesStatusUpdated({ ids, status }));
      })
      .catch((error) => {
        error.clientMessage = "Can't update restaurantDiscountTypes status";
        dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
  };
export const deleteRestaurantDiscountTypes = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteRestaurantDiscountTypes(ids)
    .then(() => {
      dispatch(actions.restaurantDiscountTypesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete restaurantDiscountTypes";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
