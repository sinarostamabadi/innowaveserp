import { createSlice } from "@reduxjs/toolkit";
const initialEmployeeInIODevicesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  employeeInIODeviceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const employeeInIODevicesSlice = createSlice({
  name: "employeeInIODevices",
  initialState: initialEmployeeInIODevicesState,
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
    // getEmployeeInIODeviceById
    employeeInIODeviceFetched: (state, action) => {
      state.actionsLoading = false;
      state.employeeInIODeviceForEdit =
        action.payload.employeeInIODeviceForEdit;
      state.error = null;
    },
    // findEmployeeInIODevices
    employeeInIODevicesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createEmployeeInIODevice
    employeeInIODeviceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateEmployeeInIODevice
    employeeInIODeviceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.EmployeeInIODeviceId ===
          action.payload.employeeInIODevice.EmployeeInIODeviceId
        ) {
          return action.payload.employeeInIODevice;
        }
        return entity;
      });
    },
    // deleteEmployeeInIODevice
    employeeInIODeviceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.EmployeeInIODeviceId !== action.payload.EmployeeInIODeviceId
      );
    },
    // deleteEmployeeInIODevices
    employeeInIODevicesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.EmployeeInIODeviceId)
      );
    },
    // employeeInIODevicesUpdateState
    employeeInIODevicesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.EmployeeInIODeviceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
