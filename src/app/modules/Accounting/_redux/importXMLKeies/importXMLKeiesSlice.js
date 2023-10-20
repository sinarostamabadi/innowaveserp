
import { createSlice } from "@reduxjs/toolkit";
const initialImportXMLKeiesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  importXMLKeyForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const importXMLKeiesSlice = createSlice({
  name: "importXMLKeies",
  initialState: initialImportXMLKeiesState,
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
    // getImportXMLKeyById  
    importXMLKeyFetched: (state, action) => {
      state.actionsLoading = false;
      state.importXMLKeyForEdit = action.payload.importXMLKeyForEdit;
      state.error = null;
    },
    // findImportXMLKeies  
    importXMLKeiesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createImportXMLKey  
    importXMLKeyCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateImportXMLKey  
    importXMLKeyUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ImportXMLKeyId === action.payload.importXMLKey.ImportXMLKeyId) {
          return action.payload.importXMLKey;
        }
        return entity;
      });
    },
    // deleteImportXMLKey  
    importXMLKeyDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ImportXMLKeyId !== action.payload.ImportXMLKeyId  
      );
    },
    // deleteImportXMLKeies  
    importXMLKeiesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ImportXMLKeyId)  
      );
    },
    // importXMLKeiesUpdateState  
    importXMLKeiesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ImportXMLKeyId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
