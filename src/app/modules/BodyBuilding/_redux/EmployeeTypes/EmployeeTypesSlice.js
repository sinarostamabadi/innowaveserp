import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeTypesSlice = createSlice({
  name: "employeeTypes",
  initialState: initialEmployeeTypesState,
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
    // getEmployeeTypeById
    employeeTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeTypeForEdit = action.payload.employeeTypeForEdit;
      state.error = null;
    },
    // findEmployeeTypes
    employeeTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeType
    employeeTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeType
    employeeTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BodyBuildingEmployeeTypeId ===
          action.payload.employeeType.BodyBuildingEmployeeTypeId
        ) {
          return action.payload.employeeType;
        }
        return entity;
      });
    },
    // deleteEmployeeType
    employeeTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.BodyBuildingEmployeeTypeId !==
          action.payload.BodyBuildingEmployeeTypeId
      );
    },
    // deleteEmployeeTypes
    employeeTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingEmployeeTypeId)
      );
    },
    // employeeTypesUpdateState
    employeeTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.BodyBuildingEmployeeTypeId) > -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
