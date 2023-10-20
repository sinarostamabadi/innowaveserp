
import { createSlice } from "@reduxjs/toolkit";
const initialAssignmentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  assignmentForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: initialAssignmentsState,
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
    // getAssignmentById  
    assignmentFetched: (state, action) => {
      state.actionsLoading = false;
      state.assignmentForEdit = action.payload.assignmentForEdit;
      state.error = null;
    },
    // findAssignments  
    assignmentsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAssignment  
    assignmentCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateAssignment  
    assignmentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.assignmentForEdit = undefined;
      state.entities = state.entities.map((entity) => {
        if (entity.AssignmentId === action.payload.assignment.AssignmentId) {
          return action.payload.assignment;
        }
        return entity;
      });
    },
    // deleteAssignment  
    assignmentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.AssignmentId !== action.payload.AssignmentId  
      );
    },
    // deleteAssignments  
    assignmentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AssignmentId)  
      );
    },
    // assignmentsUpdateState  
    assignmentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AssignmentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
