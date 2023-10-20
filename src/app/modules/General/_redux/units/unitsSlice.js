
import { createSlice } from "@reduxjs/toolkit";
const initialUnitsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  unitForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const unitsSlice = createSlice({
  name: "units",
  initialState: initialUnitsState,
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
    // getUnitById  
    unitFetched: (state, action) => {
      state.actionsLoading = false;
      state.unitForEdit = action.payload.unitForEdit;
      state.error = null;
    },
    // findUnits  
    unitsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUnit  
    unitCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateUnit  
    unitUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.UnitId === action.payload.unit.UnitId) {
          return action.payload.unit;
        }
        return entity;
      });
    },
    // deleteUnit  
    unitDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.UnitId !== action.payload.UnitId  
      );
    },
    // deleteUnits  
    unitsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.UnitId)  
      );
    },
    // unitsUpdateState  
    unitsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.UnitId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});