import { createSlice } from "@reduxjs/toolkit";
const initialIODeviceTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  iODeviceTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const iODeviceTypesSlice = createSlice({
  name: "iODeviceTypes",
  initialState: initialIODeviceTypesState,
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
    // getIODeviceTypeById
    iODeviceTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.iODeviceTypeForEdit = action.payload.iODeviceTypeForEdit;
      state.error = null;
    },
    // findIODeviceTypes
    iODeviceTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createIODeviceType
    iODeviceTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateIODeviceType
    iODeviceTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.IODeviceTypeId === action.payload.iODeviceType.IODeviceTypeId
        ) {
          return action.payload.iODeviceType;
        }
        return entity;
      });
    },
    // deleteIODeviceType
    iODeviceTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.IODeviceTypeId !== action.payload.IODeviceTypeId
      );
    },
    // deleteIODeviceTypes
    iODeviceTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.IODeviceTypeId)
      );
    },
    // iODeviceTypesUpdateState
    iODeviceTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.IODeviceTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
