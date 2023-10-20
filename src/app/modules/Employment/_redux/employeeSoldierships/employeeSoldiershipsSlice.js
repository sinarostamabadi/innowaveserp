
import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeSoldiershipsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeSoldiershipForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeSoldiershipsSlice = createSlice({
  name: "employeeSoldierships",
  initialState: initialEmployeeSoldiershipsState,
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
    // getEmployeeSoldiershipById  
    employeeSoldiershipFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeSoldiershipForEdit = action.payload.employeeSoldiershipForEdit;
      state.error = null;
    },
    // findEmployeeSoldierships  
    employeeSoldiershipsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeSoldiership  
    employeeSoldiershipCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeSoldiership  
    employeeSoldiershipUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EmployeeSoldiershipId === action.payload.employeeSoldiership.EmployeeSoldiershipId) {
          return action.payload.employeeSoldiership;
        }
        return entity;
      });
    },
    // deleteEmployeeSoldiership  
    employeeSoldiershipDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeSoldiershipId !== action.payload.EmployeeSoldiershipId  
      );
    },
    // deleteEmployeeSoldierships  
    employeeSoldiershipsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeSoldiershipId)  
      );
    },
    // employeeSoldiershipsUpdateState  
    employeeSoldiershipsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeSoldiershipId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
