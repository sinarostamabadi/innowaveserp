import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeWorkShiftsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeWorkShiftForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeWorkShiftsSlice = createSlice({
  name: "employeeWorkShifts",
  initialState: initialEmployeeWorkShiftsState,
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
    // getEmployeeWorkShiftById
    employeeWorkShiftFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeWorkShiftForEdit = action.payload.employeeWorkShiftForEdit;
      state.error = null;
    },
    // findEmployeeWorkShifts
    employeeWorkShiftsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeWorkShift
    employeeWorkShiftCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeWorkShift
    employeeWorkShiftUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.EmployeeWorkShiftId ===
          action.payload.employeeWorkShift.EmployeeWorkShiftId
        ) {
          return action.payload.employeeWorkShift;
        }
        return entity;
      });
    },
    // deleteEmployeeWorkShift
    employeeWorkShiftDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeWorkShiftId !== action.payload.EmployeeWorkShiftId
      );
    },
    // deleteEmployeeWorkShifts
    employeeWorkShiftsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeWorkShiftId)
      );
    },
    // employeeWorkShiftsUpdateState
    employeeWorkShiftsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeWorkShiftId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
