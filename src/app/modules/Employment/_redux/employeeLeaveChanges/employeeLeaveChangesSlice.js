
import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeLeaveChangesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeLeaveChangeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeLeaveChangesSlice = createSlice({
  name: "employeeLeaveChanges",
  initialState: initialEmployeeLeaveChangesState,
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
    // getEmployeeLeaveChangeById  
    employeeLeaveChangeFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeLeaveChangeForEdit = action.payload.employeeLeaveChangeForEdit;
      state.error = null;
    },
    // findEmployeeLeaveChanges  
    employeeLeaveChangesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeLeaveChange  
    employeeLeaveChangeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeLeaveChange  
    employeeLeaveChangeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EmployeeLeaveChangeId === action.payload.employeeLeaveChange.EmployeeLeaveChangeId) {
          return action.payload.employeeLeaveChange;
        }
        return entity;
      });
    },
    // deleteEmployeeLeaveChange  
    employeeLeaveChangeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeLeaveChangeId !== action.payload.EmployeeLeaveChangeId  
      );
    },
    // deleteEmployeeLeaveChanges  
    employeeLeaveChangesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeLeaveChangeId)  
      );
    },
    // employeeLeaveChangesUpdateState  
    employeeLeaveChangesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeLeaveChangeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
