import { createSlice } from "@reduxjs/toolkit";
const initialReservesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  reserveForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const reservesSlice = createSlice({
  name: "reserves",
  initialState: initialReservesState,
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
    // getReserveById
    reserveFetched: (state, action) => {
      state.actionsLoading = false;
      state.reserveForEdit = action.payload.reserveForEdit;
      state.error = null;
    },
    // findReserves
    reservesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createReserve
    reserveCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      if (!!state.entities == !1) state.entities = [];
      state.entities.push(action.payload);
    },
    // updateReserve
    reserveUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ReserveId === action.payload.reserve.ReserveId) {
          return action.payload.reserve;
        }
        return entity;
      });
    },
    // deleteReserve
    reserveDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ReserveId !== action.payload.ReserveId
      );
    },
    // deleteReserves
    reservesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ReserveId)
      );
    },
    // reserveDone
    reservesDoned: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
    },
    // reservesUpdateState
    reservesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ReserveId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
