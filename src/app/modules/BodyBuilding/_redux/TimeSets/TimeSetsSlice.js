import { createSlice } from "@reduxjs/toolkit";
const initialTimeSetsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  timeSetForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const timeSetsSlice = createSlice({
  name: "timeSets",
  initialState: initialTimeSetsState,
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
    // getTimeSetById
    timeSetFetched: (state, action) => {
      state.actionsLoading = false;
      state.timeSetForEdit = action.payload.timeSetForEdit;
      state.error = null;
    },
    // findTimeSets
    timeSetsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createTimeSet
    timeSetCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateTimeSet
    timeSetUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BodyBuildingTimeSetId ===
          action.payload.timeSet.BodyBuildingTimeSetId
        ) {
          return action.payload.timeSet;
        }
        return entity;
      });
    },
    // deleteTimeSet
    timeSetDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.BodyBuildingTimeSetId !== action.payload.BodyBuildingTimeSetId
      );
    },
    // deleteTimeSets
    timeSetsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingTimeSetId)
      );
    },
    // timeSetsUpdateState
    timeSetsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BodyBuildingTimeSetId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
