
import { createSlice } from "@reduxjs/toolkit";
const initialSellPricingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellPricingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellPricingSlice = createSlice({
  name: "sellPricing",
  initialState: initialSellPricingState,
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
    // getSellPricingById  
    sellPricingFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellPricingForEdit = action.payload.sellPricingForEdit;
      state.error = null;
    },
    // findSellPricing  
    sellPricingsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSellPricing  
    sellPricingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSellPricing  
    sellPricingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SellPricingId === action.payload.sellPricing.SellPricingId) {
          return action.payload.sellPricing;
        }
        return entity;
      });
    },
    // deleteSellPricing  
    sellPricingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellPricingId !== action.payload.SellPricingId  
      );
    },
    // deleteSellPricing  
    sellPricingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellPricingId)  
      );
    },
    // sellPricingUpdateState  
    sellPricingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellPricingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
