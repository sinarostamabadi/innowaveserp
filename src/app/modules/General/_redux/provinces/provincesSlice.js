
import { createSlice } from "@reduxjs/toolkit";
const initialProvincesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  provinceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const provincesSlice = createSlice({
  name: "provinces",
  initialState: initialProvincesState,
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
    // getProvinceById  
    provinceFetched: (state, action) => {
      state.actionsLoading = false;
      state.provinceForEdit = action.payload.provinceForEdit;
      state.error = null;
    },
    // findProvinces  
    provincesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createProvince  
    provinceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateProvince  
    provinceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ProvinceId === action.payload.province.ProvinceId) {
          return action.payload.province;
        }
        return entity;
      });
    },
    // deleteProvince  
    provinceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ProvinceId !== action.payload.ProvinceId  
      );
    },
    // deleteProvinces  
    provincesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ProvinceId)  
      );
    },
    // provincesUpdateState  
    provincesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ProvinceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
