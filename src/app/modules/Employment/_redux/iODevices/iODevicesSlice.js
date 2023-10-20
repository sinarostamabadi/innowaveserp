
import { createSlice } from "@reduxjs/toolkit";
const initialIODevicesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  iODeviceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const iODevicesSlice = createSlice({
  name: "iODevices",
  initialState: initialIODevicesState,
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
    // getIODeviceById  
    iODeviceFetched: (state, action) => {
      state.actionsLoading = false;
      state.iODeviceForEdit = action.payload.iODeviceForEdit;
      state.error = null;
    },
    // findIODevices  
    iODevicesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createIODevice  
    iODeviceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateIODevice  
    iODeviceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.IODeviceId === action.payload.iODevice.IODeviceId) {
          return action.payload.iODevice;
        }
        return entity;
      });
    },
    // deleteIODevice  
    iODeviceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.IODeviceId !== action.payload.IODeviceId  
      );
    },
    // deleteIODevices  
    iODevicesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.IODeviceId)  
      );
    },
    // iODevicesUpdateState  
    iODevicesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.IODeviceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});