import { createSlice } from "@reduxjs/toolkit";
const initialPersonTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  personTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const personTypesSlice = createSlice({
  name: "personTypes",
  initialState: initialPersonTypesState,
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
    // getPersonTypeById
    personTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.personTypeForEdit = action.payload.personTypeForEdit;
      state.error = null;
    },
    // findPersonTypes
    personTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPersonType
    personTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePersonType
    personTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PersonTypeId === action.payload.personType.PersonTypeId) {
          return action.payload.personType;
        }
        return entity;
      });
    },
    // deletePersonType
    personTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PersonTypeId !== action.payload.PersonTypeId
      );
    },
    // deletePersonTypes
    personTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PersonTypeId)
      );
    },
    // personTypesUpdateState
    personTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PersonTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
