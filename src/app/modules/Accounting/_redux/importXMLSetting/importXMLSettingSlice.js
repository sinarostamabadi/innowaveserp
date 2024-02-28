import { createSlice } from "@reduxjs/toolkit";
const initialImportXMLSettingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  importXMLSettingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const importXMLSettingSlice = createSlice({
  name: "importXMLSetting",
  initialState: initialImportXMLSettingState,
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
    // getImportXMLSettingById
    importXMLSettingFetched: (state, action) => {
      state.actionsLoading = false;
      state.importXMLSettingForEdit = action.payload.importXMLSettingForEdit;
      state.error = null;
    },
    // findImportXMLSetting
    importXMLSettingFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createImportXMLSetting
    importXMLSettingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateImportXMLSetting
    importXMLSettingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.ImportXMLSettingId ===
          action.payload.importXMLSetting.ImportXMLSettingId
        ) {
          return action.payload.importXMLSetting;
        }
        return entity;
      });
    },
    // deleteImportXMLSetting
    importXMLSettingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ImportXMLSettingId !== action.payload.ImportXMLSettingId
      );
    },
    // deleteImportXMLSetting
    importXMLSettingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ImportXMLSettingId)
      );
    },
    // importXMLSettingUpdateState
    importXMLSettingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ImportXMLSettingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
