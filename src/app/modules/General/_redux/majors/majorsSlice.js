
import { createSlice } from "@reduxjs/toolkit";
const initialMajorsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  majorForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const majorsSlice = createSlice({
  name: "majors",
  initialState: initialMajorsState,
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
    // getMajorById  
    majorFetched: (state, action) => {
      state.actionsLoading = false;
      state.majorForEdit = action.payload.majorForEdit;
      state.error = null;
    },
    // findMajors  
    majorsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMajor  
    majorCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMajor  
    majorUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MajorId === action.payload.major.MajorId) {
          return action.payload.major;
        }
        return entity;
      });
    },
    // deleteMajor  
    majorDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MajorId !== action.payload.MajorId  
      );
    },
    // deleteMajors  
    majorsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MajorId)  
      );
    },
    // majorsUpdateState  
    majorsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MajorId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});