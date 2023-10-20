
import { createSlice } from "@reduxjs/toolkit";
const initialSoldiershipTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  soldiershipTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const soldiershipTypesSlice = createSlice({
  name: "soldiershipTypes",
  initialState: initialSoldiershipTypesState,
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
    // getSoldiershipTypeById  
    soldiershipTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.soldiershipTypeForEdit = action.payload.soldiershipTypeForEdit;
      state.error = null;
    },
    // findSoldiershipTypes  
    soldiershipTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSoldiershipType  
    soldiershipTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSoldiershipType  
    soldiershipTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SoldiershipTypeId === action.payload.soldiershipType.SoldiershipTypeId) {
          return action.payload.soldiershipType;
        }
        return entity;
      });
    },
    // deleteSoldiershipType  
    soldiershipTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SoldiershipTypeId !== action.payload.SoldiershipTypeId  
      );
    },
    // deleteSoldiershipTypes  
    soldiershipTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SoldiershipTypeId)  
      );
    },
    // soldiershipTypesUpdateState  
    soldiershipTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SoldiershipTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
