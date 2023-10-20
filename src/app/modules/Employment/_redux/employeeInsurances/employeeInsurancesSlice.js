
import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeInsurancesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeInsuranceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeInsurancesSlice = createSlice({
  name: "employeeInsurances",
  initialState: initialEmployeeInsurancesState,
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
    // getEmployeeInsuranceById  
    employeeInsuranceFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeInsuranceForEdit = action.payload.employeeInsuranceForEdit;
      state.error = null;
    },
    // findEmployeeInsurances  
    employeeInsurancesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeInsurance  
    employeeInsuranceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeInsurance  
    employeeInsuranceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EmployeeInsuranceId === action.payload.employeeInsurance.EmployeeInsuranceId) {
          return action.payload.employeeInsurance;
        }
        return entity;
      });
    },
    // deleteEmployeeInsurance  
    employeeInsuranceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeInsuranceId !== action.payload.EmployeeInsuranceId  
      );
    },
    // deleteEmployeeInsurances  
    employeeInsurancesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeInsuranceId)  
      );
    },
    // employeeInsurancesUpdateState  
    employeeInsurancesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeInsuranceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
