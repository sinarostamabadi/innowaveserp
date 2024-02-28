import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeRelationsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeRelationForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeRelationsSlice = createSlice({
  name: "employeeRelations",
  initialState: initialEmployeeRelationsState,
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
    // getEmployeeRelationById
    employeeRelationFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeRelationForEdit = action.payload.employeeRelationForEdit;
      state.error = null;
    },
    // findEmployeeRelations
    employeeRelationsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeRelation
    employeeRelationCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeRelation
    employeeRelationUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.EmployeeRelationId ===
          action.payload.employeeRelation.EmployeeRelationId
        ) {
          return action.payload.employeeRelation;
        }
        return entity;
      });
    },
    // deleteEmployeeRelation
    employeeRelationDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeRelationId !== action.payload.EmployeeRelationId
      );
    },
    // deleteEmployeeRelations
    employeeRelationsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeRelationId)
      );
    },
    // employeeRelationsUpdateState
    employeeRelationsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeRelationId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
