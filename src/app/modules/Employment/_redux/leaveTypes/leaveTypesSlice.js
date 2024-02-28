import { createSlice } from "@reduxjs/toolkit";
const initialLeaveTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  leaveTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const leaveTypesSlice = createSlice({
  name: "leaveTypes",
  initialState: initialLeaveTypesState,
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
    // getLeaveTypeById
    leaveTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.leaveTypeForEdit = action.payload.leaveTypeForEdit;
      state.error = null;
    },
    // findLeaveTypes
    leaveTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createLeaveType
    leaveTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateLeaveType
    leaveTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.LeaveTypeId === action.payload.leaveType.LeaveTypeId) {
          return action.payload.leaveType;
        }
        return entity;
      });
    },
    // deleteLeaveType
    leaveTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.LeaveTypeId !== action.payload.LeaveTypeId
      );
    },
    // deleteLeaveTypes
    leaveTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.LeaveTypeId)
      );
    },
    // leaveTypesUpdateState
    leaveTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.LeaveTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
