import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeLeavesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeLeaveForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeLeavesSlice = createSlice({
  name: "employeeLeaves",
  initialState: initialEmployeeLeavesState,
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
    // getEmployeeLeaveById
    employeeLeaveFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeLeaveForEdit = action.payload.employeeLeaveForEdit;
      state.error = null;
    },
    // findEmployeeLeaves
    employeeLeavesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeLeave
    employeeLeaveCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeLeave
    employeeLeaveUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.EmployeeLeaveId ===
          action.payload.employeeLeave.EmployeeLeaveId
        ) {
          return action.payload.employeeLeave;
        }
        return entity;
      });
    },
    // deleteEmployeeLeave
    employeeLeaveDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeLeaveId !== action.payload.EmployeeLeaveId
      );
    },
    // deleteEmployeeLeaves
    employeeLeavesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeLeaveId)
      );
    },
    // employeeLeavesUpdateState
    employeeLeavesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeLeaveId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
