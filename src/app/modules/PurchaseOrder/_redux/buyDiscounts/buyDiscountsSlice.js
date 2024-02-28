import { createSlice } from "@reduxjs/toolkit";
const initialBuyDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  buyDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const buyDiscountsSlice = createSlice({
  name: "buyDiscounts",
  initialState: initialBuyDiscountsState,
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
    // getBuyDiscountById
    buyDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.buyDiscountForEdit = action.payload.buyDiscountForEdit;
      state.error = null;
    },
    // findBuyDiscounts
    buyDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBuyDiscount
    buyDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBuyDiscount
    buyDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BuyDiscountId === action.payload.buyDiscount.BuyDiscountId) {
          return action.payload.buyDiscount;
        }
        return entity;
      });
    },
    // deleteBuyDiscount
    buyDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BuyDiscountId !== action.payload.BuyDiscountId
      );
    },
    // deleteBuyDiscounts
    buyDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BuyDiscountId)
      );
    },
    // buyDiscountsUpdateState
    buyDiscountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BuyDiscountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
