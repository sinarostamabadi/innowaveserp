import { createSlice } from "@reduxjs/toolkit";
const initialOrganizationUnitsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  organizationUnitForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const organizationUnitsSlice = createSlice({
  name: "organizationUnits",
  initialState: initialOrganizationUnitsState,
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
    // getOrganizationUnitById
    organizationUnitFetched: (state, action) => {
      state.actionsLoading = false;
      state.organizationUnitForEdit = action.payload.organizationUnitForEdit;
      state.error = null;
    },
    // findOrganizationUnits
    organizationUnitsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOrganizationUnit
    organizationUnitCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateOrganizationUnit
    organizationUnitUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.OrganizationUnitId ===
          action.payload.organizationUnit.OrganizationUnitId
        ) {
          return action.payload.organizationUnit;
        }
        return entity;
      });
    },
    // deleteOrganizationUnit
    organizationUnitDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.OrganizationUnitId !== action.payload.OrganizationUnitId
      );
    },
    // deleteOrganizationUnits
    organizationUnitsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.OrganizationUnitId)
      );
    },
    // organizationUnitsUpdateState
    organizationUnitsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.OrganizationUnitId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
