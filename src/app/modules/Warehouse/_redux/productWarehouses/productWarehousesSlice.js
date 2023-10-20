
import { createSlice } from "@reduxjs/toolkit";
const initialProductWarehousesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  productWarehouseForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const productWarehousesSlice = createSlice({
  name: "productWarehouses",
  initialState: initialProductWarehousesState,
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
    // getProductWarehouseById  
    productWarehouseFetched: (state, action) => {
      state.actionsLoading = false;
      state.productWarehouseForEdit = action.payload.productWarehouseForEdit;
      state.error = null;
    },
    // findProductWarehouses  
    productWarehousesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createProductWarehouse  
    productWarehouseCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateProductWarehouse  
    productWarehouseUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ProductWarehouseId === action.payload.productWarehouse.ProductWarehouseId) {
          return action.payload.productWarehouse;
        }
        return entity;
      });
    },
    // deleteProductWarehouse  
    productWarehouseDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ProductWarehouseId !== action.payload.ProductWarehouseId  
      );
    },
    // deleteProductWarehouses  
    productWarehousesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ProductWarehouseId)  
      );
    },
    // productWarehousesUpdateState  
    productWarehousesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ProductWarehouseId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
