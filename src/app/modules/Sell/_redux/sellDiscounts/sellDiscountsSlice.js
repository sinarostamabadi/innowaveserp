
import { createSlice } from "@reduxjs/toolkit";
const initialSellDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellDiscountsSlice = createSlice({
  name: "sellDiscounts",
  initialState: initialSellDiscountsState,
  reducers: {
    catchError: (state, action) => {
      state.error = action.payload.error.message;
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
    // getSellDiscountById  
    sellDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellDiscountForEdit = action.payload.sellDiscountForEdit;
      state.error = null;
    },
    // findSellDiscounts  
    sellDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
      state.sellDiscountForEdit = undefined;
    },
    // createSellDiscount  
    sellDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.sellDiscountForEdit = undefined;
      state.entities.push(action.payload);
    },
    // updateSellDiscount  
    sellDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.sellDiscountForEdit = undefined;
      state.entities = state.entities.map((entity) => {
        if (entity.SellDiscountId === action.payload.sellDiscount.SellDiscountId) {
          return action.payload.sellDiscount;
        }
        return entity;
      });
    },
    // deleteSellDiscount  
    sellDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellDiscountId !== action.payload.SellDiscountId  
      );
    },
    // deleteSellDiscounts  
    sellDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellDiscountId)  
      );
    },
    // sellDiscountsUpdateState  
    sellDiscountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellDiscountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
