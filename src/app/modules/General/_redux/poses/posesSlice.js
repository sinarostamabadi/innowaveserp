import { createSlice } from "@reduxjs/toolkit";
const initialPosesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  posForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const posesSlice = createSlice({
  name: "poses",
  initialState: initialPosesState,
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
    // getPosById
    posFetched: (state, action) => {
      state.actionsLoading = false;
      state.posForEdit = action.payload.posForEdit;
      state.error = null;
    },
    // findPoses
    posesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPos
    posCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updatePos
    posUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PosId === action.payload.pos.PosId) {
          return action.payload.pos;
        }
        return entity;
      });

      return;
    },
    // deletePos
    posDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PosId !== action.payload.PosId
      );
    },
    // deletePoses
    posesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PosId)
      );
    },
    // posesUpdateState
    posesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PosId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
