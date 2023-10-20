
import { createSlice } from "@reduxjs/toolkit";
const initialBuyReturnsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  buyReturnForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const buyReturnsSlice = createSlice({
  name: "buyReturns",
  initialState: initialBuyReturnsState,
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
    // getBuyReturnById  
    buyReturnFetched: (state, action) => {
      state.actionsLoading = false;
      state.buyReturnForEdit = action.payload.buyReturnForEdit;
      state.error = null;
    },
    // findBuyReturns  
    buyReturnsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBuyReturn  
    buyReturnCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBuyReturn  
    buyReturnUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BuyReturnId === action.payload.buyReturn.BuyReturnId) {
          return action.payload.buyReturn;
        }
        return entity;
      });
    },
    // deleteBuyReturn  
    buyReturnDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BuyReturnId !== action.payload.BuyReturnId  
      );
    },
    // deleteBuyReturns  
    buyReturnsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BuyReturnId)  
      );
    },
    // buyReturnsUpdateState  
    buyReturnsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BuyReturnId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});