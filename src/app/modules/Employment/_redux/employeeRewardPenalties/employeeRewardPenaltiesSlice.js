import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeRewardPenaltiesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeRewardPenaltyForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeRewardPenaltiesSlice = createSlice({
  name: "employeeRewardPenalties",
  initialState: initialEmployeeRewardPenaltiesState,
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
    // getEmployeeRewardPenaltyById
    employeeRewardPenaltyFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeRewardPenaltyForEdit =
        action.payload.employeeRewardPenaltyForEdit;
      state.error = null;
    },
    // findEmployeeRewardPenalties
    employeeRewardPenaltiesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeRewardPenalty
    employeeRewardPenaltyCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeRewardPenalty
    employeeRewardPenaltyUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.EmployeeRewardPenaltyId ===
          action.payload.employeeRewardPenalty.EmployeeRewardPenaltyId
        ) {
          return action.payload.employeeRewardPenalty;
        }
        return entity;
      });
    },
    // deleteEmployeeRewardPenalty
    employeeRewardPenaltyDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.EmployeeRewardPenaltyId !== action.payload.EmployeeRewardPenaltyId
      );
    },
    // deleteEmployeeRewardPenalties
    employeeRewardPenaltiesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeRewardPenaltyId)
      );
    },
    // employeeRewardPenaltiesUpdateState
    employeeRewardPenaltiesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeRewardPenaltyId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
