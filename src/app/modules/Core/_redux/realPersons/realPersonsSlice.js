import { createSlice } from "@reduxjs/toolkit";
const initialRealPersonsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  realPersonForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const realPersonsSlice = createSlice({
  name: "realPersons",
  initialState: initialRealPersonsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }

      console.log("States ", state.error);
      
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getRealPersonById  
    realPersonFetched: (state, action) => {
      state.actionsLoading = false;
      state.realPersonForEdit = action.payload.realPersonForEdit;
      state.error = null;
    },
    // findRealPersons  
    realPersonsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRealPerson  
    realPersonCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRealPerson  
    realPersonUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.RealPersonId === action.payload.realPerson.RealPersonId) {
          return action.payload.realPerson;
        }
        return entity;
      });
    },
    // deleteRealPerson  
    realPersonDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RealPersonId !== action.payload.RealPersonId  
      );
    },
    // deleteRealPersons  
    realPersonsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RealPersonId)  
      );
    },
    // realPersonsUpdateState  
    realPersonsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RealPersonId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
