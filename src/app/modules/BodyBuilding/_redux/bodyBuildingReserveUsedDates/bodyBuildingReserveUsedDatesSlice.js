import { createSlice } from "@reduxjs/toolkit";
const initialBodyBuildingReserveUsedDatesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bodyBuildingReserveUsedDateForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bodyBuildingReserveUsedDatesSlice = createSlice({
  name: "bodyBuildingReserveUsedDates",
  initialState: initialBodyBuildingReserveUsedDatesState,
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
    // getBodyBuildingReserveUsedDateById
    bodyBuildingReserveUsedDateFetched: (state, action) => {
      state.actionsLoading = false;
      state.bodyBuildingReserveUsedDateForEdit =
        action.payload.bodyBuildingReserveUsedDateForEdit;
      state.error = null;
    },
    // findBodyBuildingReserveUsedDates
    bodyBuildingReserveUsedDatesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBodyBuildingReserveUsedDate
    bodyBuildingReserveUsedDateCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBodyBuildingReserveUsedDate
    bodyBuildingReserveUsedDateUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BodyBuildingReserveUsedDateId ===
          action.payload.bodyBuildingReserveUsedDate
            .BodyBuildingReserveUsedDateId
        ) {
          return action.payload.bodyBuildingReserveUsedDate;
        }
        return entity;
      });
    },
    // deleteBodyBuildingReserveUsedDate
    bodyBuildingReserveUsedDateDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.BodyBuildingReserveUsedDateId !==
          action.payload.BodyBuildingReserveUsedDateId
      );
    },
    // deleteBodyBuildingReserveUsedDates
    bodyBuildingReserveUsedDatesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingReserveUsedDateId)
      );
    },
    // bodyBuildingReserveUsedDatesUpdateState
    bodyBuildingReserveUsedDatesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.BodyBuildingReserveUsedDateId) >
          -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
