import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeContractsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeContractForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeContractsSlice = createSlice({
  name: "employeeContracts",
  initialState: initialEmployeeContractsState,
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
    // getEmployeeContractById
    employeeContractFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeContractForEdit = action.payload.employeeContractForEdit;
      state.error = null;
    },
    // findEmployeeContracts
    employeeContractsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeContract
    employeeContractCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeContract
    employeeContractUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.EmployeeContractId ===
          action.payload.employeeContract.EmployeeContractId
        ) {
          return action.payload.employeeContract;
        }
        return entity;
      });
    },
    // deleteEmployeeContract
    employeeContractDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeContractId !== action.payload.EmployeeContractId
      );
    },
    // deleteEmployeeContracts
    employeeContractsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeContractId)
      );
    },
    // employeeContractsUpdateState
    employeeContractsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeContractId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
