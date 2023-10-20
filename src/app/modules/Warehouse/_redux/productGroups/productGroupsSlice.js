
import { createSlice } from "@reduxjs/toolkit";
const initialProductGroupsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  productGroupForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const productGroupsSlice = createSlice({
  name: "productGroups",
  initialState: initialProductGroupsState,
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
    // getProductGroupById  
    productGroupFetched: (state, action) => {
      state.actionsLoading = false;
      state.productGroupForEdit = action.payload.productGroupForEdit;
      state.error = null;
    },
    // findProductGroups  
    productGroupsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createProductGroup  
    productGroupCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateProductGroup  
    productGroupUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ProductGroupId === action.payload.productGroup.ProductGroupId) {
          return action.payload.productGroup;
        }
        return entity;
      });
    },
    // deleteProductGroup  
    productGroupDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ProductGroupId !== action.payload.ProductGroupId  
      );
    },
    // deleteProductGroups  
    productGroupsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ProductGroupId)  
      );
    },
    // productGroupsUpdateState  
    productGroupsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ProductGroupId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
