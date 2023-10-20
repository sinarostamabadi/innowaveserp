
import { createSlice } from "@reduxjs/toolkit";
const initialWorkShiftsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  workShiftForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const workShiftsSlice = createSlice({
  name: "workShifts",
  initialState: initialWorkShiftsState,
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
    // getWorkShiftById  
    workShiftFetched: (state, action) => {
      state.actionsLoading = false;
      state.workShiftForEdit = action.payload.workShiftForEdit;
      state.error = null;
    },
    // findWorkShifts  
    workShiftsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createWorkShift  
    workShiftCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateWorkShift  
    workShiftUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.WorkShiftId === action.payload.workShift.WorkShiftId) {
          return action.payload.workShift;
        }
        return entity;
      });
    },
    // deleteWorkShift  
    workShiftDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.WorkShiftId !== action.payload.WorkShiftId  
      );
    },
    // deleteWorkShifts  
    workShiftsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.WorkShiftId)  
      );
    },
    // workShiftsUpdateState  
    workShiftsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.WorkShiftId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});