import { createSlice } from "@reduxjs/toolkit";
const initialActionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  actionForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const actionsSlice = createSlice({
  name: "actions",
  initialState: initialActionsState,
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
    // getActionById
    actionFetched: (state, action) => {
      state.actionsLoading = false;
      state.actionForEdit = action.payload.actionForEdit;
      state.error = null;
    },
    // findActions
    actionsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAction
    actionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateAction
    actionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ActionId === action.payload.action.ActionId) {
          return action.payload.action;
        }
        return entity;
      });
    },
    // deleteAction
    actionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ActionId !== action.payload.ActionId
      );
    },
    // deleteActions
    actionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ActionId)
      );
    },
    // actionsUpdateState
    actionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ActionId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
