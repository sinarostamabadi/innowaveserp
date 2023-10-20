
import { createSlice } from "@reduxjs/toolkit";
const initialFutsalReservesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  futsalReserveForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const futsalReservesSlice = createSlice({
  name: "futsalReserves",
  initialState: initialFutsalReservesState,
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
    // getFutsalReserveById  
    futsalReserveFetched: (state, action) => {
      state.actionsLoading = false;
      state.futsalReserveForEdit = action.payload.futsalReserveForEdit;
      state.error = null;
    },
    // findFutsalReserves  
    futsalReservesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createFutsalReserve  
    futsalReserveCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateFutsalReserve  
    futsalReserveUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.FutsalReserveId === action.payload.futsalReserve.FutsalReserveId) {
          return action.payload.futsalReserve;
        }
        return entity;
      });
    },
    // deleteFutsalReserve  
    futsalReserveDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.FutsalReserveId !== action.payload.FutsalReserveId  
      );
    },
    // deleteFutsalReserves  
    futsalReservesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.FutsalReserveId)  
      );
    },
    // futsalReservesUpdateState  
    futsalReservesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.FutsalReserveId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
