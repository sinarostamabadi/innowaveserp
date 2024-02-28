import { createSlice } from "@reduxjs/toolkit";
const initialUnitMeasureGroupsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  unitMeasureGroupForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const unitMeasureGroupsSlice = createSlice({
  name: "unitMeasureGroups",
  initialState: initialUnitMeasureGroupsState,
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
    // getUnitMeasureGroupById
    unitMeasureGroupFetched: (state, action) => {
      state.actionsLoading = false;
      state.unitMeasureGroupForEdit = action.payload.unitMeasureGroupForEdit;
      state.error = null;
    },
    // findUnitMeasureGroups
    unitMeasureGroupsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUnitMeasureGroup
    unitMeasureGroupCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateUnitMeasureGroup
    unitMeasureGroupUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.UnitMeasureGroupId ===
          action.payload.unitMeasureGroup.UnitMeasureGroupId
        ) {
          return action.payload.unitMeasureGroup;
        }
        return entity;
      });
    },
    // deleteUnitMeasureGroup
    unitMeasureGroupDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.UnitMeasureGroupId !== action.payload.UnitMeasureGroupId
      );
    },
    // deleteUnitMeasureGroups
    unitMeasureGroupsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.UnitMeasureGroupId)
      );
    },
    // unitMeasureGroupsUpdateState
    unitMeasureGroupsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.UnitMeasureGroupId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
