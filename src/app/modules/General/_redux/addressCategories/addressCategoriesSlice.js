import { createSlice } from "@reduxjs/toolkit";
const initialAddressCategoriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  addressCategoryForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const addressCategoriesSlice = createSlice({
  name: "addressCategories",
  initialState: initialAddressCategoriesState,
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
    // getAddressCategoryById  
    addressCategoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.addressCategoryForEdit = action.payload.addressCategoryForEdit;
      state.error = null;
    },
    // findAddressCategories  
    addressCategoriesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAddressCategory  
    addressCategoryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateAddressCategory  
    addressCategoryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.AddressCategoryId === action.payload.addressCategory.AddressCategoryId) {
          return action.payload.addressCategory;
        }
        return entity;
      });
    },
    // deleteAddressCategory  
    addressCategoryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.AddressCategoryId !== action.payload.AddressCategoryId  
      );
    },
    // deleteAddressCategories  
    addressCategoriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AddressCategoryId)  
      );
    },
    // addressCategoriesUpdateState  
    addressCategoriesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AddressCategoryId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
