import { createSlice } from "@reduxjs/toolkit";
const initialEmployeesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeesSlice = createSlice({
  name: "employees",
  initialState: initialEmployeesState,
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
    // getEmployeeById
    employeeFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeForEdit = action.payload.employeeForEdit;
      state.error = null;
    },
    // findEmployees
    employeesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployee
    employeeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployee
    employeeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BodyBuildingEmployeeId ===
          action.payload.employee.BodyBuildingEmployeeId
        ) {
          return action.payload.employee;
        }
        return entity;
      });
    },
    // deleteEmployee
    employeeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.BodyBuildingEmployeeId !== action.payload.BodyBuildingEmployeeId
      );
    },
    // deleteEmployees
    employeesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingEmployeeId)
      );
    },
    // employeesUpdateState
    employeesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BodyBuildingEmployeeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
