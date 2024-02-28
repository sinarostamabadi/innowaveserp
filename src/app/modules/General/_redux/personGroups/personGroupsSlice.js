import { createSlice } from "@reduxjs/toolkit";
const initialPersonGroupsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  personGroupForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const personGroupsSlice = createSlice({
  name: "personGroups",
  initialState: initialPersonGroupsState,
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
    // getPersonGroupById
    personGroupFetched: (state, action) => {
      state.actionsLoading = false;
      state.personGroupForEdit = action.payload.personGroupForEdit;
      state.error = null;
    },
    // findPersonGroups
    personGroupsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPersonGroup
    personGroupCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePersonGroup
    personGroupUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PersonGroupId === action.payload.personGroup.PersonGroupId) {
          return action.payload.personGroup;
        }
        return entity;
      });
    },
    // deletePersonGroup
    personGroupDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PersonGroupId !== action.payload.PersonGroupId
      );
    },
    // deletePersonGroups
    personGroupsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PersonGroupId)
      );
    },
    // personGroupsUpdateState
    personGroupsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PersonGroupId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
