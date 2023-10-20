
import { createSlice } from "@reduxjs/toolkit";
const initialWarehousesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  warehouseForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const warehousesSlice = createSlice({
  name: "warehouses",
  initialState: initialWarehousesState,
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
    // getWarehouseById  
    warehouseFetched: (state, action) => {
      state.actionsLoading = false;
      state.warehouseForEdit = action.payload.warehouseForEdit;
      state.error = null;
    },
    // findWarehouses  
    warehousesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createWarehouse  
    warehouseCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateWarehouse  
    warehouseUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.WarehouseId === action.payload.warehouse.WarehouseId) {
          return action.payload.warehouse;
        }
        return entity;
      });
    },
    // deleteWarehouse  
    warehouseDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.WarehouseId !== action.payload.WarehouseId  
      );
    },
    // deleteWarehouses  
    warehousesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.WarehouseId)  
      );
    },
    // warehousesUpdateState  
    warehousesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.WarehouseId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
