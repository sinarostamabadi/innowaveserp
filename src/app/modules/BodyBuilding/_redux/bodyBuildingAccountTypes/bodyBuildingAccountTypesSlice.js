
import { createSlice } from "@reduxjs/toolkit";
const initialBodyBuildingAccountTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bodyBuildingAccountTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bodyBuildingAccountTypesSlice = createSlice({
  name: "bodyBuildingAccountTypes",
  initialState: initialBodyBuildingAccountTypesState,
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
    // getBodyBuildingAccountTypeById  
    bodyBuildingAccountTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.bodyBuildingAccountTypeForEdit = action.payload.bodyBuildingAccountTypeForEdit;
      state.error = null;
    },
    // findBodyBuildingAccountTypes  
    bodyBuildingAccountTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBodyBuildingAccountType  
    bodyBuildingAccountTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBodyBuildingAccountType  
    bodyBuildingAccountTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BodyBuildingAccountTypeId === action.payload.bodyBuildingAccountType.BodyBuildingAccountTypeId) {
          return action.payload.bodyBuildingAccountType;
        }
        return entity;
      });
    },
    // deleteBodyBuildingAccountType  
    bodyBuildingAccountTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BodyBuildingAccountTypeId !== action.payload.BodyBuildingAccountTypeId  
      );
    },
    // deleteBodyBuildingAccountTypes  
    bodyBuildingAccountTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingAccountTypeId)  
      );
    },
    // bodyBuildingAccountTypesUpdateState  
    bodyBuildingAccountTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BodyBuildingAccountTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
