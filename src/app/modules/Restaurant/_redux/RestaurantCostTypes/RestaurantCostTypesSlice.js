import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantCostTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantCostTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantCostTypesSlice = createSlice({
  name: "restaurantCostTypes",
  initialState: initialRestaurantCostTypesState,
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
    // getRestaurantCostTypeById
    restaurantCostTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantCostTypeForEdit =
        action.payload.restaurantCostTypeForEdit;
      state.error = null;
    },
    // findRestaurantCostTypes
    restaurantCostTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantCostType
    restaurantCostTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantCostType
    restaurantCostTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantCostTypeId ===
          action.payload.restaurantCostType.RestaurantCostTypeId
        ) {
          return action.payload.restaurantCostType;
        }
        return entity;
      });
    },
    // deleteRestaurantCostType
    restaurantCostTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RestaurantCostTypeId !== action.payload.RestaurantCostTypeId
      );
    },
    // deleteRestaurantCostTypes
    restaurantCostTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantCostTypeId)
      );
    },
    // restaurantCostTypesUpdateState
    restaurantCostTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantCostTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
