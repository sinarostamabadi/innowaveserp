
import { createSlice } from "@reduxjs/toolkit";
const initialBrandsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  brandForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const brandsSlice = createSlice({
  name: "brands",
  initialState: initialBrandsState,
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
    // getBrandById  
    brandFetched: (state, action) => {
      state.actionsLoading = false;
      state.brandForEdit = action.payload.brandForEdit;
      state.error = null;
    },
    // findBrands  
    brandsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBrand  
    brandCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBrand  
    brandUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BrandId === action.payload.brand.BrandId) {
          return action.payload.brand;
        }
        return entity;
      });
    },
    // deleteBrand  
    brandDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BrandId !== action.payload.BrandId  
      );
    },
    // deleteBrands  
    brandsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BrandId)  
      );
    },
    // brandsUpdateState  
    brandsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BrandId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});