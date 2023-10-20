
import { createSlice } from "@reduxjs/toolkit";
const initialPoolReservesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  poolReserveForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const poolReservesSlice = createSlice({
  name: "poolReserves",
  initialState: initialPoolReservesState,
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
    // getPoolReserveById  
    poolReserveFetched: (state, action) => {
      state.actionsLoading = false;
      state.poolReserveForEdit = action.payload.poolReserveForEdit;
      state.error = null;
    },
    // findPoolReserves  
    poolReservesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPoolReserve  
    poolReserveCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePoolReserve  
    poolReserveUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PoolReserveId === action.payload.poolReserve.PoolReserveId) {
          return action.payload.poolReserve;
        }
        return entity;
      });
    },
    // deletePoolReserve  
    poolReserveDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PoolReserveId !== action.payload.PoolReserveId  
      );
    },
    // deletePoolReserves  
    poolReservesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PoolReserveId)  
      );
    },
    // poolReservesUpdateState  
    poolReservesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PoolReserveId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
