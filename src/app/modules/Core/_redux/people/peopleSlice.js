import { createSlice } from "@reduxjs/toolkit";
const initialpeopleState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  personForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const peopleSlice = createSlice({
  name: "people",
  initialState: initialpeopleState,
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
    // getPersonById  
    personFetched: (state, action) => {
      state.actionsLoading = false;
      state.personForEdit = action.payload.personForEdit;
      state.error = null;
    },
    // findpeople  
    peopleFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPerson  
    personCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePerson  
    personUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PersonId === action.payload.person.PersonId) {
          return action.payload.person;
        }
        return entity;
      });
    },
    // deletePerson  
    personDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PersonId !== action.payload.PersonId  
      );
    },
    // deletepeople  
    peopleDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PersonId)  
      );
    },
    // peopleUpdateState  
    peopleStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PersonId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
