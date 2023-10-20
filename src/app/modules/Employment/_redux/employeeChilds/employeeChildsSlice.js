
import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeChildsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeChildForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeChildsSlice = createSlice({
  name: "employeeChilds",
  initialState: initialEmployeeChildsState,
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
    // getEmployeeChildById  
    employeeChildFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeChildForEdit = action.payload.employeeChildForEdit;
      state.error = null;
    },
    // findEmployeeChilds  
    employeeChildsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeChild  
    employeeChildCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeChild  
    employeeChildUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EmployeeChildId === action.payload.employeeChild.EmployeeChildId) {
          return action.payload.employeeChild;
        }
        return entity;
      });
    },
    // deleteEmployeeChild  
    employeeChildDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeChildId !== action.payload.EmployeeChildId  
      );
    },
    // deleteEmployeeChilds  
    employeeChildsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeChildId)  
      );
    },
    // employeeChildsUpdateState  
    employeeChildsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeChildId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});