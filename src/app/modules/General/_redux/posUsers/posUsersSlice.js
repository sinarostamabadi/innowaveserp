
import { createSlice } from "@reduxjs/toolkit";
const initialPosUsersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  posUserForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const posUsersSlice = createSlice({
  name: "posUsers",
  initialState: initialPosUsersState,
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
    // getPosUserById  
    posUserFetched: (state, action) => {
      state.actionsLoading = false;
      state.posUserForEdit = action.payload.posUserForEdit;
      state.error = null;
    },
    // findPosUsers  
    posUsersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPosUser  
    posUserCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePosUser  
    posUserUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PosUserId === action.payload.posUser.PosUserId) {
          return action.payload.posUser;
        }
        return entity;
      });
    },
    // deletePosUser  
    posUserDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PosUserId !== action.payload.PosUserId  
      );
    },
    // deletePosUsers  
    posUsersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PosUserId)  
      );
    },
    // posUsersUpdateState  
    posUsersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PosUserId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
