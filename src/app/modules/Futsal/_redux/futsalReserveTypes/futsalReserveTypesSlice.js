
import { createSlice } from "@reduxjs/toolkit";
const initialFutsalReserveTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  futsalReserveTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const futsalReserveTypesSlice = createSlice({
  name: "futsalReserveTypes",
  initialState: initialFutsalReserveTypesState,
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
    // getFutsalReserveTypeById  
    futsalReserveTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.futsalReserveTypeForEdit = action.payload.futsalReserveTypeForEdit;
      state.error = null;
    },
    // findFutsalReserveTypes  
    futsalReserveTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createFutsalReserveType  
    futsalReserveTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateFutsalReserveType  
    futsalReserveTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.FutsalReserveTypeId === action.payload.futsalReserveType.FutsalReserveTypeId) {
          return action.payload.futsalReserveType;
        }
        return entity;
      });
    },
    // deleteFutsalReserveType  
    futsalReserveTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.FutsalReserveTypeId !== action.payload.FutsalReserveTypeId  
      );
    },
    // deleteFutsalReserveTypes  
    futsalReserveTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.FutsalReserveTypeId)  
      );
    },
    // futsalReserveTypesUpdateState  
    futsalReserveTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.FutsalReserveTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
