import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeSpecialDatesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeSpecialDateForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeSpecialDatesSlice = createSlice({
  name: "employeeSpecialDates",
  initialState: initialEmployeeSpecialDatesState,
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
    // getEmployeeSpecialDateById
    employeeSpecialDateFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeSpecialDateForEdit =
        action.payload.employeeSpecialDateForEdit;
      state.error = null;
    },
    // findEmployeeSpecialDates
    employeeSpecialDatesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeSpecialDate
    employeeSpecialDateCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeSpecialDate
    employeeSpecialDateUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.EmployeeSpecialDateId ===
          action.payload.employeeSpecialDate.EmployeeSpecialDateId
        ) {
          return action.payload.employeeSpecialDate;
        }
        return entity;
      });
    },
    // deleteEmployeeSpecialDate
    employeeSpecialDateDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.EmployeeSpecialDateId !== action.payload.EmployeeSpecialDateId
      );
    },
    // deleteEmployeeSpecialDates
    employeeSpecialDatesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeSpecialDateId)
      );
    },
    // employeeSpecialDatesUpdateState
    employeeSpecialDatesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeSpecialDateId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
