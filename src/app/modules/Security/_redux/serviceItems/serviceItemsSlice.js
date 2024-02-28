import { createSlice } from "@reduxjs/toolkit";
const initialServiceItemsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  serviceItemForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const serviceItemsSlice = createSlice({
  name: "serviceItems",
  initialState: initialServiceItemsState,
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
    // getServiceItemById
    serviceItemFetched: (state, action) => {
      state.actionsLoading = false;
      state.serviceItemForEdit = action.payload.serviceItemForEdit;
      state.error = null;
    },
    // findServiceItems
    serviceItemsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createServiceItem
    serviceItemCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateServiceItem
    serviceItemUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ServiceItemId === action.payload.serviceItem.ServiceItemId) {
          return action.payload.serviceItem;
        }
        return entity;
      });
    },
    // deleteServiceItem
    serviceItemDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ServiceItemId !== action.payload.ServiceItemId
      );
    },
    // deleteServiceItems
    serviceItemsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ServiceItemId)
      );
    },
    // serviceItemsUpdateState
    serviceItemsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ServiceItemId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
