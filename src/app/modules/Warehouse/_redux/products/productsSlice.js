
import { createSlice } from "@reduxjs/toolkit";
const initialProductsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  productForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
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
    // getProductById  
    productFetched: (state, action) => {
      state.actionsLoading = false;
      state.productForEdit = action.payload.productForEdit;
      state.error = null;
    },
    // findProducts  
    productsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createProduct  
    productCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateProduct  
    productUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ProductId === action.payload.product.ProductId) {
          return action.payload.product;
        }
        return entity;
      });
    },
    // deleteProduct  
    productDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ProductId !== action.payload.ProductId  
      );
    },
    // deleteProducts  
    productsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ProductId)  
      );
    },
    // productsUpdateState  
    productsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ProductId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
