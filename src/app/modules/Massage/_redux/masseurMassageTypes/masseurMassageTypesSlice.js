
import { createSlice } from "@reduxjs/toolkit";
const initialMasseurMassageTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  masseurMassageTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const masseurMassageTypesSlice = createSlice({
  name: "masseurMassageTypes",
  initialState: initialMasseurMassageTypesState,
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
    // getMasseurMassageTypeById  
    masseurMassageTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.masseurMassageTypeForEdit = action.payload.masseurMassageTypeForEdit;
      state.error = null;
    },
    // findMasseurMassageTypes  
    masseurMassageTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMasseurMassageType  
    masseurMassageTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMasseurMassageType  
    masseurMassageTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MasseurMassageTypeId === action.payload.masseurMassageType.MasseurMassageTypeId) {
          return action.payload.masseurMassageType;
        }
        return entity;
      });
    },
    // deleteMasseurMassageType  
    masseurMassageTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MasseurMassageTypeId !== action.payload.MasseurMassageTypeId  
      );
    },
    // deleteMasseurMassageTypes  
    masseurMassageTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MasseurMassageTypeId)  
      );
    },
    // masseurMassageTypesUpdateState  
    masseurMassageTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MasseurMassageTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
