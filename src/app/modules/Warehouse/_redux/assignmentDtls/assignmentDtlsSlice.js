
import { createSlice } from "@reduxjs/toolkit";
const initialAssignmentDtlsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  assignmentDtlForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const assignmentDtlsSlice = createSlice({
  name: "assignmentDtls",
  initialState: initialAssignmentDtlsState,
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
    // getAssignmentDtlById  
    assignmentDtlFetched: (state, action) => {
      state.actionsLoading = false;
      state.assignmentDtlForEdit = action.payload.assignmentDtlForEdit;
      state.error = null;
    },
    // findAssignmentDtls  
    assignmentDtlsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAssignmentDtl  
    assignmentDtlCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateAssignmentDtl  
    assignmentDtlUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.AssignmentDtlId === action.payload.assignmentDtl.AssignmentDtlId) {
          return action.payload.assignmentDtl;
        }
        return entity;
      });
    },
    // deleteAssignmentDtl  
    assignmentDtlDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.AssignmentDtlId !== action.payload.AssignmentDtlId  
      );
    },
    // deleteAssignmentDtls  
    assignmentDtlsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AssignmentDtlId)  
      );
    },
    // assignmentDtlsUpdateState  
    assignmentDtlsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AssignmentDtlId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
