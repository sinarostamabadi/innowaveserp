import { createSlice } from "@reduxjs/toolkit";
const initialBodyBuildingReservesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bodyBuildingReserveForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bodyBuildingReservesSlice = createSlice({
  name: "bodyBuildingReserves",
  initialState: initialBodyBuildingReservesState,
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
    // getBodyBuildingReserveById
    bodyBuildingReserveFetched: (state, action) => {
      state.actionsLoading = false;
      state.bodyBuildingReserveForEdit =
        action.payload.bodyBuildingReserveForEdit;
      state.error = null;
    },
    // findBodyBuildingReserves
    bodyBuildingReservesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBodyBuildingReserve
    bodyBuildingReserveCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBodyBuildingReserve
    bodyBuildingReserveUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BodyBuildingReserveId ===
          action.payload.bodyBuildingReserve.BodyBuildingReserveId
        ) {
          return action.payload.bodyBuildingReserve;
        }
        return entity;
      });
    },
    // deleteBodyBuildingReserve
    bodyBuildingReserveDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.BodyBuildingReserveId !== action.payload.BodyBuildingReserveId
      );
    },
    // deleteBodyBuildingReserves
    bodyBuildingReservesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingReserveId)
      );
    },
    // bodyBuildingReservesUpdateState
    bodyBuildingReservesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BodyBuildingReserveId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
