
import { createSlice } from "@reduxjs/toolkit";
const initialUsersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
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
    // getUserById  
    userFetched: (state, action) => {
      state.actionsLoading = false;
      state.userForEdit = action.payload.userForEdit;
      state.error = null;
    },
    // findUsers  
    usersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUser  
    userCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateUser  
    userUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.UserId === action.payload.user.UserId) {
          return action.payload.user;
        }
        return entity;
      });
    },
    // deleteUser  
    userDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.UserId !== action.payload.UserId  
      );
    },
    // deleteUsers  
    usersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.UserId)  
      );
    },
    // usersUpdateState  
    usersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.UserId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
