
import { createSlice } from "@reduxjs/toolkit";
const initialAssignmentSerialsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  assignmentSerialForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const assignmentSerialsSlice = createSlice({
  name: "assignmentSerials",
  initialState: initialAssignmentSerialsState,
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
    // getAssignmentSerialById  
    assignmentSerialFetched: (state, action) => {
      state.actionsLoading = false;
      state.assignmentSerialForEdit = action.payload.assignmentSerialForEdit;
      state.error = null;
    },
    // findAssignmentSerials  
    assignmentSerialsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAssignmentSerial  
    assignmentSerialCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateAssignmentSerial  
    assignmentSerialUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.AssignmentSerialId === action.payload.assignmentSerial.AssignmentSerialId) {
          return action.payload.assignmentSerial;
        }
        return entity;
      });
    },
    // deleteAssignmentSerial  
    assignmentSerialDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.AssignmentSerialId !== action.payload.AssignmentSerialId  
      );
    },
    // deleteAssignmentSerials  
    assignmentSerialsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AssignmentSerialId)  
      );
    },
    // assignmentSerialsUpdateState  
    assignmentSerialsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AssignmentSerialId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
