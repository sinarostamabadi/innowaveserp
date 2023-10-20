
import { createSlice } from "@reduxjs/toolkit";
const initialPromissoryNotesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  promissoryNoteForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const promissoryNotesSlice = createSlice({
  name: "promissoryNotes",
  initialState: initialPromissoryNotesState,
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
    // getPromissoryNoteById  
    promissoryNoteFetched: (state, action) => {
      state.actionsLoading = false;
      state.promissoryNoteForEdit = action.payload.promissoryNoteForEdit;
      state.error = null;
    },
    // findPromissoryNotes  
    promissoryNotesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPromissoryNote  
    promissoryNoteCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePromissoryNote  
    promissoryNoteUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PromissoryNoteId === action.payload.promissoryNote.PromissoryNoteId) {
          return action.payload.promissoryNote;
        }
        return entity;
      });
    },
    // deletePromissoryNote  
    promissoryNoteDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PromissoryNoteId !== action.payload.PromissoryNoteId  
      );
    },
    // deletePromissoryNotes  
    promissoryNotesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PromissoryNoteId)  
      );
    },
    // promissoryNotesUpdateState  
    promissoryNotesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PromissoryNoteId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
