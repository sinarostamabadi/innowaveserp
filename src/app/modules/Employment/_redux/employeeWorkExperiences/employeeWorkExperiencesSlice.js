
import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeWorkExperiencesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeWorkExperienceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeWorkExperiencesSlice = createSlice({
  name: "employeeWorkExperiences",
  initialState: initialEmployeeWorkExperiencesState,
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
    // getEmployeeWorkExperienceById  
    employeeWorkExperienceFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeWorkExperienceForEdit = action.payload.employeeWorkExperienceForEdit;
      state.error = null;
    },
    // findEmployeeWorkExperiences  
    employeeWorkExperiencesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeWorkExperience  
    employeeWorkExperienceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeWorkExperience  
    employeeWorkExperienceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EmployeeWorkExperienceId === action.payload.employeeWorkExperience.EmployeeWorkExperienceId) {
          return action.payload.employeeWorkExperience;
        }
        return entity;
      });
    },
    // deleteEmployeeWorkExperience  
    employeeWorkExperienceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeWorkExperienceId !== action.payload.EmployeeWorkExperienceId  
      );
    },
    // deleteEmployeeWorkExperiences  
    employeeWorkExperiencesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeWorkExperienceId)  
      );
    },
    // employeeWorkExperiencesUpdateState  
    employeeWorkExperiencesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeWorkExperienceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});