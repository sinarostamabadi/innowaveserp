
import { createSlice } from "@reduxjs/toolkit";
const initialBilliardReservesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  billiardReserveForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const billiardReservesSlice = createSlice({
  name: "billiardReserves",
  initialState: initialBilliardReservesState,
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
    // getBilliardReserveById  
    billiardReserveFetched: (state, action) => {
      state.actionsLoading = false;
      state.billiardReserveForEdit = action.payload.billiardReserveForEdit;
      state.error = null;
    },
    // findBilliardReserves  
    billiardReservesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBilliardReserve  
    billiardReserveCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBilliardReserve  
    billiardReserveUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BilliardReserveId === action.payload.billiardReserve.BilliardReserveId) {
          return action.payload.billiardReserve;
        }
        return entity;
      });
    },
    // deleteBilliardReserve  
    billiardReserveDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BilliardReserveId !== action.payload.BilliardReserveId  
      );
    },
    // deleteBilliardReserves  
    billiardReservesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BilliardReserveId)  
      );
    },
    // billiardReservesUpdateState  
    billiardReservesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BilliardReserveId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
