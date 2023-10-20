
import { createSlice } from "@reduxjs/toolkit";
const initialEmploymentTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employmentTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employmentTypesSlice = createSlice({
  name: "employmentTypes",
  initialState: initialEmploymentTypesState,
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
    // getEmploymentTypeById  
    employmentTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.employmentTypeForEdit = action.payload.employmentTypeForEdit;
      state.error = null;
    },
    // findEmploymentTypes  
    employmentTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmploymentType  
    employmentTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmploymentType  
    employmentTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EmploymentTypeId === action.payload.employmentType.EmploymentTypeId) {
          return action.payload.employmentType;
        }
        return entity;
      });
    },
    // deleteEmploymentType  
    employmentTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmploymentTypeId !== action.payload.EmploymentTypeId  
      );
    },
    // deleteEmploymentTypes  
    employmentTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmploymentTypeId)  
      );
    },
    // employmentTypesUpdateState  
    employmentTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmploymentTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
