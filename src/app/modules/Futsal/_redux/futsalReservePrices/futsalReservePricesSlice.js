import { createSlice } from "@reduxjs/toolkit";
const initialFutsalReservePricesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  futsalReservePriceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const futsalReservePricesSlice = createSlice({
  name: "futsalReservePrices",
  initialState: initialFutsalReservePricesState,
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
    // getFutsalReservePriceById
    futsalReservePriceFetched: (state, action) => {
      state.actionsLoading = false;
      state.futsalReservePriceForEdit =
        action.payload.futsalReservePriceForEdit;
      state.error = null;
    },
    // findFutsalReservePrices
    futsalReservePricesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createFutsalReservePrice
    futsalReservePriceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateFutsalReservePrice
    futsalReservePriceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.FutsalReservePriceId ===
          action.payload.futsalReservePrice.FutsalReservePriceId
        ) {
          return action.payload.futsalReservePrice;
        }
        return entity;
      });
    },
    // deleteFutsalReservePrice
    futsalReservePriceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.FutsalReservePriceId !== action.payload.FutsalReservePriceId
      );
    },
    // deleteFutsalReservePrices
    futsalReservePricesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.FutsalReservePriceId)
      );
    },
    // futsalReservePricesUpdateState
    futsalReservePricesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.FutsalReservePriceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
