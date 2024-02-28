import { createSlice } from "@reduxjs/toolkit";
const initialOrganizationChartsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  organizationChartForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const organizationChartsSlice = createSlice({
  name: "organizationCharts",
  initialState: initialOrganizationChartsState,
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
    // getOrganizationChartById
    organizationChartFetched: (state, action) => {
      state.actionsLoading = false;
      state.organizationChartForEdit = action.payload.organizationChartForEdit;
      state.error = null;
    },
    // findOrganizationCharts
    organizationChartsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOrganizationChart
    organizationChartCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateOrganizationChart
    organizationChartUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.OrganizationChartId ===
          action.payload.organizationChart.OrganizationChartId
        ) {
          return action.payload.organizationChart;
        }
        return entity;
      });
    },
    // deleteOrganizationChart
    organizationChartDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.OrganizationChartId !== action.payload.OrganizationChartId
      );
    },
    // deleteOrganizationCharts
    organizationChartsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.OrganizationChartId)
      );
    },
    // organizationChartsUpdateState
    organizationChartsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.OrganizationChartId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
