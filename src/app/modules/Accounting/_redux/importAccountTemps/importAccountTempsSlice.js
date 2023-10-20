
import { createSlice } from "@reduxjs/toolkit";
const initialImportAccountTempsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  importAccountTempForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const importAccountTempsSlice = createSlice({
  name: "importAccountTemps",
  initialState: initialImportAccountTempsState,
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
    // getImportAccountTempById  
    importAccountTempFetched: (state, action) => {
      state.actionsLoading = false;
      state.importAccountTempForEdit = action.payload.importAccountTempForEdit;
      state.error = null;
    },
    // findImportAccountTemps  
    importAccountTempsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createImportAccountTemp  
    importAccountTempCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateImportAccountTemp  
    importAccountTempUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ImportAccountTempId === action.payload.importAccountTemp.ImportAccountTempId) {
          return action.payload.importAccountTemp;
        }
        return entity;
      });
    },
    // deleteImportAccountTemp  
    importAccountTempDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ImportAccountTempId !== action.payload.ImportAccountTempId  
      );
    },
    // deleteImportAccountTemps  
    importAccountTempsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ImportAccountTempId)  
      );
    },
    // importAccountTempsUpdateState  
    importAccountTempsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ImportAccountTempId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
