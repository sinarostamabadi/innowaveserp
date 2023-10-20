
import { createSlice } from "@reduxjs/toolkit";
const initialImportAccountFloatingTempsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  importAccountFloatingTempForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const importAccountFloatingTempsSlice = createSlice({
  name: "importAccountFloatingTemps",
  initialState: initialImportAccountFloatingTempsState,
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
    // getImportAccountFloatingTempById  
    importAccountFloatingTempFetched: (state, action) => {
      state.actionsLoading = false;
      state.importAccountFloatingTempForEdit = action.payload.importAccountFloatingTempForEdit;
      state.error = null;
    },
    // findImportAccountFloatingTemps  
    importAccountFloatingTempsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createImportAccountFloatingTemp  
    importAccountFloatingTempCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateImportAccountFloatingTemp  
    importAccountFloatingTempUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ImportAccountFloatingTempId === action.payload.importAccountFloatingTemp.ImportAccountFloatingTempId) {
          return action.payload.importAccountFloatingTemp;
        }
        return entity;
      });
    },
    // deleteImportAccountFloatingTemp  
    importAccountFloatingTempDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ImportAccountFloatingTempId !== action.payload.ImportAccountFloatingTempId  
      );
    },
    // deleteImportAccountFloatingTemps  
    importAccountFloatingTempsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ImportAccountFloatingTempId)  
      );
    },
    // importAccountFloatingTempsUpdateState  
    importAccountFloatingTempsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ImportAccountFloatingTempId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
