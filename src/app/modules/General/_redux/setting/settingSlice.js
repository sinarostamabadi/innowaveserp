import { createSlice } from "@reduxjs/toolkit";
const initialSettingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  settingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const settingSlice = createSlice({
  name: "setting",
  initialState: initialSettingState,
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
    // getSettingById
    settingFetched: (state, action) => {
      state.actionsLoading = false;
      state.settingForEdit = action.payload.settingForEdit;
      state.error = null;
    },
    // findSetting
    settingFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSetting
    settingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSetting
    settingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SettingId === action.payload.setting.SettingId) {
          return action.payload.setting;
        }
        return entity;
      });
    },
    // deleteSetting
    settingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SettingId !== action.payload.SettingId
      );
    },
    // deleteSetting
    settingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SettingId)
      );
    },
    // settingUpdateState
    settingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SettingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
