import { createSlice } from "@reduxjs/toolkit";
const initialEntityPointsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  entityPointForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const entityPointsSlice = createSlice({
  name: "entityPoints",
  initialState: initialEntityPointsState,
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
    // getEntityPointById
    entityPointFetched: (state, action) => {
      state.actionsLoading = false;
      state.entityPointForEdit = action.payload.entityPointForEdit;
      state.error = null;
    },
    // findEntityPoints
    entityPointsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEntityPoint
    entityPointCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEntityPoint
    entityPointUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EntityPointId === action.payload.entityPoint.EntityPointId) {
          return action.payload.entityPoint;
        }
        return entity;
      });
    },
    // deleteEntityPoint
    entityPointDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EntityPointId !== action.payload.EntityPointId
      );
    },
    // deleteEntityPoints
    entityPointsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EntityPointId)
      );
    },
    // entityPointsUpdateState
    entityPointsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EntityPointId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
