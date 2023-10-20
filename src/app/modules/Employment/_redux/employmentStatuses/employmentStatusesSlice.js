
import { createSlice } from "@reduxjs/toolkit";
const initialEmploymentStatusesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employmentStatusForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employmentStatusesSlice = createSlice({
  name: "employmentStatuses",
  initialState: initialEmploymentStatusesState,
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
    // getEmploymentStatusById  
    employmentStatusFetched: (state, action) => {
      state.actionsLoading = false;
      state.employmentStatusForEdit = action.payload.employmentStatusForEdit;
      state.error = null;
    },
    // findEmploymentStatuses  
    employmentStatusesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmploymentStatus  
    employmentStatusCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmploymentStatus  
    employmentStatusUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EmploymentStatusId === action.payload.employmentStatus.EmploymentStatusId) {
          return action.payload.employmentStatus;
        }
        return entity;
      });
    },
    // deleteEmploymentStatus  
    employmentStatusDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmploymentStatusId !== action.payload.EmploymentStatusId  
      );
    },
    // deleteEmploymentStatuses  
    employmentStatusesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmploymentStatusId)  
      );
    },
    // employmentStatusesUpdateState  
    employmentStatusesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmploymentStatusId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
