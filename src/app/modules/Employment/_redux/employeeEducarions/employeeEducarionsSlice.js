
import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeEducarionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeEducarionForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeEducarionsSlice = createSlice({
  name: "employeeEducarions",
  initialState: initialEmployeeEducarionsState,
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
    // getEmployeeEducarionById  
    employeeEducarionFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeEducarionForEdit = action.payload.employeeEducarionForEdit;
      state.error = null;
    },
    // findEmployeeEducarions  
    employeeEducarionsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeEducarion  
    employeeEducarionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeEducarion  
    employeeEducarionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EmployeeEducarionId === action.payload.employeeEducarion.EmployeeEducarionId) {
          return action.payload.employeeEducarion;
        }
        return entity;
      });
    },
    // deleteEmployeeEducarion  
    employeeEducarionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeEducarionId !== action.payload.EmployeeEducarionId  
      );
    },
    // deleteEmployeeEducarions  
    employeeEducarionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeEducarionId)  
      );
    },
    // employeeEducarionsUpdateState  
    employeeEducarionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeEducarionId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
