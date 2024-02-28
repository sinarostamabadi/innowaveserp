import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeMonthlyCalculatedsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeMonthlyCalculatedForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeMonthlyCalculatedsSlice = createSlice({
  name: "employeeMonthlyCalculateds",
  initialState: initialEmployeeMonthlyCalculatedsState,
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
    // getEmployeeMonthlyCalculatedById
    employeeMonthlyCalculatedFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeMonthlyCalculatedForEdit =
        action.payload.employeeMonthlyCalculatedForEdit;
      state.error = null;
    },
    // findEmployeeMonthlyCalculateds
    employeeMonthlyCalculatedsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeMonthlyCalculated
    employeeMonthlyCalculatedCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeMonthlyCalculated
    employeeMonthlyCalculatedUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.EmployeeMonthlyCalculatedId ===
          action.payload.employeeMonthlyCalculated.EmployeeMonthlyCalculatedId
        ) {
          return action.payload.employeeMonthlyCalculated;
        }
        return entity;
      });
    },
    // deleteEmployeeMonthlyCalculated
    employeeMonthlyCalculatedDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.EmployeeMonthlyCalculatedId !==
          action.payload.EmployeeMonthlyCalculatedId
      );
    },
    // deleteEmployeeMonthlyCalculateds
    employeeMonthlyCalculatedsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeMonthlyCalculatedId)
      );
    },
    // employeeMonthlyCalculatedsUpdateState
    employeeMonthlyCalculatedsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.EmployeeMonthlyCalculatedId) > -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
