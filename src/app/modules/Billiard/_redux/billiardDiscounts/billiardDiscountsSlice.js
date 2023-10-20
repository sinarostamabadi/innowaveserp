
import { createSlice } from "@reduxjs/toolkit";
const initialBilliardDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  billiardDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const billiardDiscountsSlice = createSlice({
  name: "billiardDiscounts",
  initialState: initialBilliardDiscountsState,
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
    // getBilliardDiscountById  
    billiardDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.billiardDiscountForEdit = action.payload.billiardDiscountForEdit;
      state.error = null;
    },
    // findBilliardDiscounts  
    billiardDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBilliardDiscount  
    billiardDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBilliardDiscount  
    billiardDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BilliardDiscountId === action.payload.billiardDiscount.BilliardDiscountId) {
          return action.payload.billiardDiscount;
        }
        return entity;
      });
    },
    // deleteBilliardDiscount  
    billiardDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BilliardDiscountId !== action.payload.BilliardDiscountId  
      );
    },
    // deleteBilliardDiscounts  
    billiardDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BilliardDiscountId)  
      );
    },
    // billiardDiscountsUpdateState  
    billiardDiscountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BilliardDiscountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
