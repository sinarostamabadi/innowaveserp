import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantTablesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantTableForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantTablesSlice = createSlice({
  name: "restaurantTables",
  initialState: initialRestaurantTablesState,
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
    // getRestaurantTableById
    restaurantTableFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantTableForEdit = action.payload.restaurantTableForEdit;
      state.error = null;
    },
    // findRestaurantTables
    restaurantTablesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantTable
    restaurantTableCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantTable
    restaurantTableUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantTableId ===
          action.payload.restaurantTable.RestaurantTableId
        ) {
          return action.payload.restaurantTable;
        }
        return entity;
      });
    },
    // deleteRestaurantTable
    restaurantTableDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RestaurantTableId !== action.payload.RestaurantTableId
      );
    },
    // deleteRestaurantTables
    restaurantTablesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantTableId)
      );
    },
    // restaurantTablesUpdateState
    restaurantTablesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantTableId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
