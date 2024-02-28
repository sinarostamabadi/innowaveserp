import { createSlice } from "@reduxjs/toolkit";
const initialPersonSpecialDaysState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  personSpecialDayForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const personSpecialDaysSlice = createSlice({
  name: "personSpecialDays",
  initialState: initialPersonSpecialDaysState,
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
    // getPersonSpecialDayById
    personSpecialDayFetched: (state, action) => {
      state.actionsLoading = false;
      state.personSpecialDayForEdit = action.payload.personSpecialDayForEdit;
      state.error = null;
    },
    // findPersonSpecialDays
    personSpecialDaysFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPersonSpecialDay
    personSpecialDayCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePersonSpecialDay
    personSpecialDayUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.PersonSpecialDayId ===
          action.payload.personSpecialDay.PersonSpecialDayId
        ) {
          return action.payload.personSpecialDay;
        }
        return entity;
      });
    },
    // deletePersonSpecialDay
    personSpecialDayDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PersonSpecialDayId !== action.payload.PersonSpecialDayId
      );
    },
    // deletePersonSpecialDays
    personSpecialDaysDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PersonSpecialDayId)
      );
    },
    // personSpecialDaysUpdateState
    personSpecialDaysStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PersonSpecialDayId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
