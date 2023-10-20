
import { createSlice } from "@reduxjs/toolkit";
const initialTechnicalTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  technicalTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const technicalTypesSlice = createSlice({
  name: "technicalTypes",
  initialState: initialTechnicalTypesState,
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
    // getTechnicalTypeById  
    technicalTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.technicalTypeForEdit = action.payload.technicalTypeForEdit;
      state.error = null;
    },
    // findTechnicalTypes  
    technicalTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createTechnicalType  
    technicalTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateTechnicalType  
    technicalTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.TechnicalTypeId === action.payload.technicalType.TechnicalTypeId) {
          return action.payload.technicalType;
        }
        return entity;
      });
    },
    // deleteTechnicalType  
    technicalTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.TechnicalTypeId !== action.payload.TechnicalTypeId  
      );
    },
    // deleteTechnicalTypes  
    technicalTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.TechnicalTypeId)  
      );
    },
    // technicalTypesUpdateState  
    technicalTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.TechnicalTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
