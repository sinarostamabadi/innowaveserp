
import { createSlice } from "@reduxjs/toolkit";
const initialSellPricingDetailsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellPricingDetailForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellPricingDetailsSlice = createSlice({
  name: "sellPricingDetails",
  initialState: initialSellPricingDetailsState,
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
    // getSellPricingDetailById  
    sellPricingDetailFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellPricingDetailForEdit = action.payload.sellPricingDetailForEdit;
      state.error = null;
    },
    // findSellPricingDetails  
    sellPricingDetailsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSellPricingDetail  
    sellPricingDetailCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSellPricingDetail  
    sellPricingDetailUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SellPricingDetailId === action.payload.sellPricingDetail.SellPricingDetailId) {
          return action.payload.sellPricingDetail;
        }
        return entity;
      });
    },
    // deleteSellPricingDetail  
    sellPricingDetailDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellPricingDetailId !== action.payload.SellPricingDetailId  
      );
    },
    // deleteSellPricingDetails  
    sellPricingDetailsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellPricingDetailId)  
      );
    },
    // sellPricingDetailsUpdateState  
    sellPricingDetailsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellPricingDetailId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
