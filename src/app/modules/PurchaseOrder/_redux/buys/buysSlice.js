
import { createSlice } from "@reduxjs/toolkit";
const initialBuysState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  buyForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const buysSlice = createSlice({
  name: "buys",
  initialState: initialBuysState,
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
    // getBuyById  
    buyFetched: (state, action) => {
      state.actionsLoading = false;
      state.buyForEdit = action.payload.buyForEdit;
      state.error = null;
    },
    // findBuys  
    buysFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBuy  
    buyCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBuy  
    buyUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BuyId === action.payload.buy.BuyId) {
          return action.payload.buy;
        }
        return entity;
      });
    },
    // deleteBuy  
    buyDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BuyId !== action.payload.BuyId  
      );
    },
    // deleteBuys  
    buysDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BuyId)  
      );
    },
    // buysUpdateState  
    buysStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BuyId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});