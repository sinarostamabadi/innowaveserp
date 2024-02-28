import { createSlice } from "@reduxjs/toolkit";
const initialWorkShiftCalendersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  workShiftCalenderForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const workShiftCalendersSlice = createSlice({
  name: "workShiftCalenders",
  initialState: initialWorkShiftCalendersState,
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
    // getWorkShiftCalenderById
    workShiftCalenderFetched: (state, action) => {
      state.actionsLoading = false;
      state.workShiftCalenderForEdit = action.payload.workShiftCalenderForEdit;
      state.error = null;
    },
    // findWorkShiftCalenders
    workShiftCalendersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createWorkShiftCalender
    workShiftCalenderCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateWorkShiftCalender
    workShiftCalenderUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.WorkShiftCalenderId ===
          action.payload.workShiftCalender.WorkShiftCalenderId
        ) {
          return action.payload.workShiftCalender;
        }
        return entity;
      });
    },
    // deleteWorkShiftCalender
    workShiftCalenderDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.WorkShiftCalenderId !== action.payload.WorkShiftCalenderId
      );
    },
    // deleteWorkShiftCalenders
    workShiftCalendersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.WorkShiftCalenderId)
      );
    },
    // workShiftCalendersUpdateState
    workShiftCalendersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.WorkShiftCalenderId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
