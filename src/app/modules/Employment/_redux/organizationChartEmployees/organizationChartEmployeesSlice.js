
import { createSlice } from "@reduxjs/toolkit";
const initialOrganizationChartEmployeesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  organizationChartEmployeeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const organizationChartEmployeesSlice = createSlice({
  name: "organizationChartEmployees",
  initialState: initialOrganizationChartEmployeesState,
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
    // getOrganizationChartEmployeeById  
    organizationChartEmployeeFetched: (state, action) => {
      state.actionsLoading = false;
      state.organizationChartEmployeeForEdit = action.payload.organizationChartEmployeeForEdit;
      state.error = null;
    },
    // findOrganizationChartEmployees  
    organizationChartEmployeesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOrganizationChartEmployee  
    organizationChartEmployeeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateOrganizationChartEmployee  
    organizationChartEmployeeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.OrganizationChartEmployeeId === action.payload.organizationChartEmployee.OrganizationChartEmployeeId) {
          return action.payload.organizationChartEmployee;
        }
        return entity;
      });
    },
    // deleteOrganizationChartEmployee  
    organizationChartEmployeeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.OrganizationChartEmployeeId !== action.payload.OrganizationChartEmployeeId  
      );
    },
    // deleteOrganizationChartEmployees  
    organizationChartEmployeesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.OrganizationChartEmployeeId)  
      );
    },
    // organizationChartEmployeesUpdateState  
    organizationChartEmployeesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.OrganizationChartEmployeeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
