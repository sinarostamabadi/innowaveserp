import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantDiscountTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantDiscountTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantDiscountTypesSlice = createSlice({
  name: "restaurantDiscountTypes",
  initialState: initialRestaurantDiscountTypesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getRestaurantDiscountTypeById
    restaurantDiscountTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantDiscountTypeForEdit =
        action.payload.restaurantDiscountTypeForEdit;
      state.error = null;
    },
    // findRestaurantDiscountTypes
    restaurantDiscountTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantDiscountType
    restaurantDiscountTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantDiscountType
    restaurantDiscountTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantDiscountTypeId ===
          action.payload.restaurantDiscountType.RestaurantDiscountTypeId
        ) {
          return action.payload.restaurantDiscountType;
        }
        return entity;
      });
    },
    // deleteRestaurantDiscountType
    restaurantDiscountTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.RestaurantDiscountTypeId !==
          action.payload.RestaurantDiscountTypeId
      );
    },
    // deleteRestaurantDiscountTypes
    restaurantDiscountTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantDiscountTypeId)
      );
    },
    // restaurantDiscountTypesUpdateState
    restaurantDiscountTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.RestaurantDiscountTypeId) > -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
