import { createSlice } from "@reduxjs/toolkit";
const initialEmployeePhysicalConditionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeePhysicalConditionForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeePhysicalConditionsSlice = createSlice({
  name: "employeePhysicalConditions",
  initialState: initialEmployeePhysicalConditionsState,
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
    // getEmployeePhysicalConditionById
    employeePhysicalConditionFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeePhysicalConditionForEdit =
        action.payload.employeePhysicalConditionForEdit;
      state.error = null;
    },
    // findEmployeePhysicalConditions
    employeePhysicalConditionsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeePhysicalCondition
    employeePhysicalConditionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeePhysicalCondition
    employeePhysicalConditionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.EmployeePhysicalConditionId ===
          action.payload.employeePhysicalCondition.EmployeePhysicalConditionId
        ) {
          return action.payload.employeePhysicalCondition;
        }
        return entity;
      });
    },
    // deleteEmployeePhysicalCondition
    employeePhysicalConditionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.EmployeePhysicalConditionId !==
          action.payload.EmployeePhysicalConditionId
      );
    },
    // deleteEmployeePhysicalConditions
    employeePhysicalConditionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeePhysicalConditionId)
      );
    },
    // employeePhysicalConditionsUpdateState
    employeePhysicalConditionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.EmployeePhysicalConditionId) > -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
