
import { createSlice } from "@reduxjs/toolkit";
const initialImportDocumentTempsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  importDocumentTempForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const importDocumentTempsSlice = createSlice({
  name: "importDocumentTemps",
  initialState: initialImportDocumentTempsState,
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
    // getImportDocumentTempById  
    importDocumentTempFetched: (state, action) => {
      state.actionsLoading = false;
      state.importDocumentTempForEdit = action.payload.importDocumentTempForEdit;
      state.error = null;
    },
    // findImportDocumentTemps  
    importDocumentTempsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createImportDocumentTemp  
    importDocumentTempCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateImportDocumentTemp  
    importDocumentTempUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ImportDocumentTempId === action.payload.importDocumentTemp.ImportDocumentTempId) {
          return action.payload.importDocumentTemp;
        }
        return entity;
      });
    },
    // deleteImportDocumentTemp  
    importDocumentTempDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ImportDocumentTempId !== action.payload.ImportDocumentTempId  
      );
    },
    // deleteImportDocumentTemps  
    importDocumentTempsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ImportDocumentTempId)  
      );
    },
    // importDocumentTempsUpdateState  
    importDocumentTempsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ImportDocumentTempId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
