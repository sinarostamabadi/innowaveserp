
import { createSlice } from "@reduxjs/toolkit";
const initialBilliardReservePricesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  billiardReservePriceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const billiardReservePricesSlice = createSlice({
  name: "billiardReservePrices",
  initialState: initialBilliardReservePricesState,
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
    // getBilliardReservePriceById  
    billiardReservePriceFetched: (state, action) => {
      state.actionsLoading = false;
      state.billiardReservePriceForEdit = action.payload.billiardReservePriceForEdit;
      state.error = null;
    },
    // findBilliardReservePrices  
    billiardReservePricesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBilliardReservePrice  
    billiardReservePriceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBilliardReservePrice  
    billiardReservePriceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BilliardReservePriceId === action.payload.billiardReservePrice.BilliardReservePriceId) {
          return action.payload.billiardReservePrice;
        }
        return entity;
      });
    },
    // deleteBilliardReservePrice  
    billiardReservePriceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BilliardReservePriceId !== action.payload.BilliardReservePriceId  
      );
    },
    // deleteBilliardReservePrices  
    billiardReservePricesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BilliardReservePriceId)  
      );
    },
    // billiardReservePricesUpdateState  
    billiardReservePricesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BilliardReservePriceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
