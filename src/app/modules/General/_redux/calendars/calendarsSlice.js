import { createSlice } from "@reduxjs/toolkit";
const initialCalendarsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  calendarForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const calendarsSlice = createSlice({
  name: "calendars",
  initialState: initialCalendarsState,
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
    // getCalendarById
    calendarFetched: (state, action) => {
      state.actionsLoading = false;
      state.calendarForEdit = action.payload.calendarForEdit;
      state.error = null;
    },
    // findCalendars
    calendarsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCalendar
    calendarCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCalendar
    calendarUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CalendarId === action.payload.calendar.CalendarId) {
          return action.payload.calendar;
        }
        return entity;
      });
    },
    // deleteCalendar
    calendarDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CalendarId !== action.payload.CalendarId
      );
    },
    // deleteCalendars
    calendarsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CalendarId)
      );
    },
    // calendarsUpdateState
    calendarsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CalendarId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
