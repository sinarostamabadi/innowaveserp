
import { createSlice } from "@reduxjs/toolkit";
const initialSellDocumentDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellDocumentDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellDocumentDiscountsSlice = createSlice({
  name: "sellDocumentDiscounts",
  initialState: initialSellDocumentDiscountsState,
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
    // getSellDocumentDiscountById  
    sellDocumentDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellDocumentDiscountForEdit = action.payload.sellDocumentDiscountForEdit;
      state.error = null;
    },
    // findSellDocumentDiscounts  
    sellDocumentDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSellDocumentDiscount  
    sellDocumentDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSellDocumentDiscount  
    sellDocumentDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SellDocumentDiscountId === action.payload.sellDocumentDiscount.SellDocumentDiscountId) {
          return action.payload.sellDocumentDiscount;
        }
        return entity;
      });
    },
    // deleteSellDocumentDiscount  
    sellDocumentDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellDocumentDiscountId !== action.payload.SellDocumentDiscountId  
      );
    },
    // deleteSellDocumentDiscounts  
    sellDocumentDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellDocumentDiscountId)  
      );
    },
    // sellDocumentDiscountsUpdateState  
    sellDocumentDiscountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellDocumentDiscountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
