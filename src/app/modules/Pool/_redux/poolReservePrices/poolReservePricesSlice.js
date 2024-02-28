import { createSlice } from "@reduxjs/toolkit";
const initialPoolReservePricesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  poolReservePriceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const poolReservePricesSlice = createSlice({
  name: "poolReservePrices",
  initialState: initialPoolReservePricesState,
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
    // getPoolReservePriceById
    poolReservePriceFetched: (state, action) => {
      state.actionsLoading = false;
      state.poolReservePriceForEdit = action.payload.poolReservePriceForEdit;
      state.error = null;
    },
    // findPoolReservePrices
    poolReservePricesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPoolReservePrice
    poolReservePriceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePoolReservePrice
    poolReservePriceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.PoolReservePriceId ===
          action.payload.poolReservePrice.PoolReservePriceId
        ) {
          return action.payload.poolReservePrice;
        }
        return entity;
      });
    },
    // deletePoolReservePrice
    poolReservePriceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PoolReservePriceId !== action.payload.PoolReservePriceId
      );
    },
    // deletePoolReservePrices
    poolReservePricesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PoolReservePriceId)
      );
    },
    // poolReservePricesUpdateState
    poolReservePricesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PoolReservePriceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
