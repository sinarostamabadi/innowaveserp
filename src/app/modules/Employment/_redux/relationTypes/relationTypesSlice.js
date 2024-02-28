import { createSlice } from "@reduxjs/toolkit";
const initialRelationTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  relationTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const relationTypesSlice = createSlice({
  name: "relationTypes",
  initialState: initialRelationTypesState,
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
    // getRelationTypeById
    relationTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.relationTypeForEdit = action.payload.relationTypeForEdit;
      state.error = null;
    },
    // findRelationTypes
    relationTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRelationType
    relationTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRelationType
    relationTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RelationTypeId === action.payload.relationType.RelationTypeId
        ) {
          return action.payload.relationType;
        }
        return entity;
      });
    },
    // deleteRelationType
    relationTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RelationTypeId !== action.payload.RelationTypeId
      );
    },
    // deleteRelationTypes
    relationTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RelationTypeId)
      );
    },
    // relationTypesUpdateState
    relationTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RelationTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
