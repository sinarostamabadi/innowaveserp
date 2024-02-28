import { createSlice } from "@reduxjs/toolkit";
const initialFutsalReserveDatesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  futsalReserveDateForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const futsalReserveDatesSlice = createSlice({
  name: "futsalReserveDates",
  initialState: initialFutsalReserveDatesState,
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
    // getFutsalReserveDateById
    futsalReserveDateFetched: (state, action) => {
      state.actionsLoading = false;
      state.futsalReserveDateForEdit = action.payload.futsalReserveDateForEdit;
      state.error = null;
    },
    // findFutsalReserveDates
    futsalReserveDatesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createFutsalReserveDate
    futsalReserveDateCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateFutsalReserveDate
    futsalReserveDateUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.FutsalReserveDateId ===
          action.payload.futsalReserveDate.FutsalReserveDateId
        ) {
          return action.payload.futsalReserveDate;
        }
        return entity;
      });
    },
    // deleteFutsalReserveDate
    futsalReserveDateDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.FutsalReserveDateId !== action.payload.FutsalReserveDateId
      );
    },
    // deleteFutsalReserveDates
    futsalReserveDatesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.FutsalReserveDateId)
      );
    },
    // futsalReserveDatesUpdateState
    futsalReserveDatesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.FutsalReserveDateId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
