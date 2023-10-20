
import { createSlice } from "@reduxjs/toolkit";
const initialPackageTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  packageTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const packageTypesSlice = createSlice({
  name: "packageTypes",
  initialState: initialPackageTypesState,
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
    // getPackageTypeById  
    packageTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.packageTypeForEdit = action.payload.packageTypeForEdit;
      state.error = null;
    },
    // findPackageTypes  
    packageTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPackageType  
    packageTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePackageType  
    packageTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PackageTypeId === action.payload.packageType.PackageTypeId) {
          return action.payload.packageType;
        }
        return entity;
      });
    },
    // deletePackageType  
    packageTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PackageTypeId !== action.payload.PackageTypeId  
      );
    },
    // deletePackageTypes  
    packageTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PackageTypeId)  
      );
    },
    // packageTypesUpdateState  
    packageTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PackageTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});