import { createSlice } from "@reduxjs/toolkit";

const initialDashboardsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  dashboardForEdit: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const dashboardsSlice = createSlice({
  name: "dashboards",
  initialState: initialDashboardsState,
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
    // getDashboardById
    dashboardFetched: (state, action) => {
      state.actionsLoading = false;
      state.dashboardForEdit = action.payload.dashboardForEdit;
      state.error = null;
    },
    // findDashboards
    dashboardsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    }
  },
});
