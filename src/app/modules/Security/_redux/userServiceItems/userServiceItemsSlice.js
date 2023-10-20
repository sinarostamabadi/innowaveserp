
import { createSlice } from "@reduxjs/toolkit";
const initialUserServiceItemsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userServiceItemForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const userServiceItemsSlice = createSlice({
  name: "userServiceItems",
  initialState: initialUserServiceItemsState,
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
    // getUserServiceItemById  
    userServiceItemFetched: (state, action) => {
      state.actionsLoading = false;
      state.userServiceItemForEdit = action.payload.userServiceItemForEdit;
      state.error = null;
    },
    // findUserServiceItems  
    userServiceItemsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUserServiceItem  
    userServiceItemCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateUserServiceItem  
    userServiceItemUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.UserServiceItemId === action.payload.userServiceItem.UserServiceItemId) {
          return action.payload.userServiceItem;
        }
        return entity;
      });
    },
    // deleteUserServiceItem  
    userServiceItemDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.UserServiceItemId !== action.payload.UserServiceItemId  
      );
    },
    // deleteUserServiceItems  
    userServiceItemsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.UserServiceItemId)  
      );
    },
    // userServiceItemsUpdateState  
    userServiceItemsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.UserServiceItemId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});