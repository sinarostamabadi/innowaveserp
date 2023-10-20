
import { createSlice } from "@reduxjs/toolkit";
const initialDocumentTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  documentTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const documentTypesSlice = createSlice({
  name: "documentTypes",
  initialState: initialDocumentTypesState,
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
    // getDocumentTypeById  
    documentTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.documentTypeForEdit = action.payload.documentTypeForEdit;
      state.error = null;
    },
    // findDocumentTypes  
    documentTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDocumentType  
    documentTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updateDocumentType  
    documentTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.DocumentTypeId === action.payload.documentType.DocumentTypeId) {
          return action.payload.documentType;
        }
        return entity;
      });

      return;
    },
    // deleteDocumentType  
    documentTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.DocumentTypeId !== action.payload.DocumentTypeId  
      );
    },
    // deleteDocumentTypes  
    documentTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.DocumentTypeId)  
      );
    },
    // documentTypesUpdateState  
    documentTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.DocumentTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
