
import { createSlice } from "@reduxjs/toolkit";
const initialProductUnitsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  productUnitForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const productUnitsSlice = createSlice({
  name: "productUnits",
  initialState: initialProductUnitsState,
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
    // getProductUnitById  
    productUnitFetched: (state, action) => {
      state.actionsLoading = false;
      state.productUnitForEdit = action.payload.productUnitForEdit;
      state.error = null;
    },
    // findProductUnits  
    productUnitsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createProductUnit  
    productUnitCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateProductUnit  
    productUnitUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ProductUnitId === action.payload.productUnit.ProductUnitId) {
          return action.payload.productUnit;
        }
        return entity;
      });
    },
    // deleteProductUnit  
    productUnitDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ProductUnitId !== action.payload.ProductUnitId  
      );
    },
    // deleteProductUnits  
    productUnitsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ProductUnitId)  
      );
    },
    // productUnitsUpdateState  
    productUnitsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ProductUnitId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
