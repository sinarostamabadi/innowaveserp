import { createSlice } from "@reduxjs/toolkit";
const initialBodyBuildingPriceingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bodyBuildingPriceingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bodyBuildingPriceingSlice = createSlice({
  name: "bodyBuildingPriceing",
  initialState: initialBodyBuildingPriceingState,
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
    // getBodyBuildingPriceingById
    bodyBuildingPriceingFetched: (state, action) => {
      state.actionsLoading = false;
      state.bodyBuildingPriceingForEdit =
        action.payload.bodyBuildingPriceingForEdit;
      state.error = null;
    },
    // findBodyBuildingPriceing
    bodyBuildingPriceingFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBodyBuildingPriceing
    bodyBuildingPriceingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBodyBuildingPriceing
    bodyBuildingPriceingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BodyBuildingPriceingId ===
          action.payload.bodyBuildingPriceing.BodyBuildingPriceingId
        ) {
          return action.payload.bodyBuildingPriceing;
        }
        return entity;
      });
    },
    // deleteBodyBuildingPriceing
    bodyBuildingPriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.BodyBuildingPriceingId !== action.payload.BodyBuildingPriceingId
      );
    },
    // deleteBodyBuildingPriceing
    bodyBuildingPriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingPriceingId)
      );
    },
    // bodyBuildingPriceingUpdateState
    bodyBuildingPriceingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BodyBuildingPriceingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
