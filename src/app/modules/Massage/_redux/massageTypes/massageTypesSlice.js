
import { createSlice } from "@reduxjs/toolkit";
const initialMassageTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  massageTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const massageTypesSlice = createSlice({
  name: "massageTypes",
  initialState: initialMassageTypesState,
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
    // getMassageTypeById  
    massageTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.massageTypeForEdit = action.payload.massageTypeForEdit;
      state.error = null;
    },
    // findMassageTypes  
    massageTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMassageType  
    massageTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMassageType  
    massageTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MassageTypeId === action.payload.massageType.MassageTypeId) {
          return action.payload.massageType;
        }
        return entity;
      });
    },
    // deleteMassageType  
    massageTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MassageTypeId !== action.payload.MassageTypeId  
      );
    },
    // deleteMassageTypes  
    massageTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MassageTypeId)  
      );
    },
    // massageTypesUpdateState  
    massageTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MassageTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
