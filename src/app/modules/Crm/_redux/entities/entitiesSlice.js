
import { createSlice } from "@reduxjs/toolkit";
const initialEntitiesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  entityForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const entitiesSlice = createSlice({
  name: "entities",
  initialState: initialEntitiesState,
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
    // getEntityById  
    entityFetched: (state, action) => {
      state.actionsLoading = false;
      state.entityForEdit = action.payload.entityForEdit;
      state.error = null;
    },
    // findEntities  
    entitiesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEntity  
    entityCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEntity  
    entityUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.EntityId === action.payload.entity.EntityId) {
          return action.payload.entity;
        }
        return entity;
      });
    },
    // deleteEntity  
    entityDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EntityId !== action.payload.EntityId  
      );
    },
    // deleteEntities  
    entitiesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EntityId)  
      );
    },
    // entitiesUpdateState  
    entitiesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EntityId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});