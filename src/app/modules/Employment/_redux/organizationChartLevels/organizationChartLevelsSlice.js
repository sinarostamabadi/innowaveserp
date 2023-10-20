
import { createSlice } from "@reduxjs/toolkit";
const initialOrganizationChartLevelsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  organizationChartLevelForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const organizationChartLevelsSlice = createSlice({
  name: "organizationChartLevels",
  initialState: initialOrganizationChartLevelsState,
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
    // getOrganizationChartLevelById  
    organizationChartLevelFetched: (state, action) => {
      state.actionsLoading = false;
      state.organizationChartLevelForEdit = action.payload.organizationChartLevelForEdit;
      state.error = null;
    },
    // findOrganizationChartLevels  
    organizationChartLevelsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOrganizationChartLevel  
    organizationChartLevelCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateOrganizationChartLevel  
    organizationChartLevelUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.OrganizationChartLevelId === action.payload.organizationChartLevel.OrganizationChartLevelId) {
          return action.payload.organizationChartLevel;
        }
        return entity;
      });
    },
    // deleteOrganizationChartLevel  
    organizationChartLevelDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.OrganizationChartLevelId !== action.payload.OrganizationChartLevelId  
      );
    },
    // deleteOrganizationChartLevels  
    organizationChartLevelsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.OrganizationChartLevelId)  
      );
    },
    // organizationChartLevelsUpdateState  
    organizationChartLevelsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.OrganizationChartLevelId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
