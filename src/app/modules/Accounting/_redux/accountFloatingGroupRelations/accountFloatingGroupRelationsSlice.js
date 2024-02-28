import { createSlice } from "@reduxjs/toolkit";

const initialAccountFloatingGroupRelationsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  accountFloatingGroupRelationForEdit: undefined,
  lastError: null,
  error: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const accountFloatingGroupRelationsSlice = createSlice({
  name: "accountFloatingGroupRelations",
  initialState: initialAccountFloatingGroupRelationsState,
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
    // getAccountFloatingGroupRelationById
    accountFloatingGroupRelationFetched: (state, action) => {
      state.actionsLoading = false;
      state.accountFloatingGroupRelationForEdit =
        action.payload.accountFloatingGroupRelationForEdit;
      state.error = null;
    },
    // findAccountFloatingGroupRelations
    accountFloatingGroupRelationsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAccountFloatingGroupRelation
    accountFloatingGroupRelationCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updateAccountFloatingGroupRelation
    accountFloatingGroupRelationUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities =
        state.entities && state.entities.length > 0
          ? state.entities.map((entity) => {
              if (
                entity.AccountFloatingGroupRelationId ===
                action.payload.data.AccountFloatingGroupRelationId
              ) {
                return action.payload.data;
              }
              return entity;
            })
          : [];

      return;
    },
    // deleteAccountFloatingGroupRelation
    accountFloatingGroupRelationDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.AccountFloatingGroupRelationId !==
          action.payload.AccountFloatingGroupRelationId
      );
    },
    // deleteAccountFloatingGroupRelations
    accountFloatingGroupRelationsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AccountFloatingGroupRelationId)
      );
    },
    // accountFloatingGroupRelationsUpdateState
    accountFloatingGroupRelationsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.AccountFloatingGroupRelationId) >
          -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
