import { createSlice } from "@reduxjs/toolkit";
const initialClosetsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  closetForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const closetsSlice = createSlice({
  name: "closets",
  initialState: initialClosetsState,
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
    // getClosetById
    closetFetched: (state, action) => {
      state.actionsLoading = false;
      state.closetForEdit = action.payload.closetForEdit;
      state.error = null;
    },
    // findClosets
    closetsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCloset
    closetCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCloset
    closetUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BodyBuildingClosetId ===
          action.payload.closet.BodyBuildingClosetId
        ) {
          return action.payload.closet;
        }
        return entity;
      });
    },
    // open Closet
    closetOpened: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
    },
    // free Closet
    closetSettedFree: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
    },
    // deleteCloset
    closetDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BodyBuildingClosetId !== action.payload.BodyBuildingClosetId
      );
    },
    // deleteClosets
    closetsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingClosetId)
      );
    },
    // closetsUpdateState
    closetsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BodyBuildingClosetId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
