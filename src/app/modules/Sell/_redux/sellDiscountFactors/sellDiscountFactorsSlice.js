
import { createSlice } from "@reduxjs/toolkit";
const initialSellDiscountFactorsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellDiscountFactorForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellDiscountFactorsSlice = createSlice({
  name: "sellDiscountFactors",
  initialState: initialSellDiscountFactorsState,
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
    // getSellDiscountFactorById  
    sellDiscountFactorFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellDiscountFactorForEdit = action.payload.sellDiscountFactorForEdit;
      state.error = null;
    },
    // findSellDiscountFactors  
    sellDiscountFactorsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSellDiscountFactor  
    sellDiscountFactorCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSellDiscountFactor  
    sellDiscountFactorUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SellDiscountFactorId === action.payload.sellDiscountFactor.SellDiscountFactorId) {
          return action.payload.sellDiscountFactor;
        }
        return entity;
      });
    },
    // deleteSellDiscountFactor  
    sellDiscountFactorDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellDiscountFactorId !== action.payload.SellDiscountFactorId  
      );
    },
    // deleteSellDiscountFactors  
    sellDiscountFactorsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellDiscountFactorId)  
      );
    },
    // sellDiscountFactorsUpdateState  
    sellDiscountFactorsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellDiscountFactorId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
