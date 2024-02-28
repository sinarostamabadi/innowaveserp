import { createSlice } from "@reduxjs/toolkit";
const initialPoolDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  poolDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const poolDiscountsSlice = createSlice({
  name: "poolDiscounts",
  initialState: initialPoolDiscountsState,
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
    // getPoolDiscountById
    poolDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.poolDiscountForEdit = action.payload.poolDiscountForEdit;
      state.error = null;
    },
    // findPoolDiscounts
    poolDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPoolDiscount
    poolDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePoolDiscount
    poolDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.PoolDiscountId === action.payload.poolDiscount.PoolDiscountId
        ) {
          return action.payload.poolDiscount;
        }
        return entity;
      });
    },
    // deletePoolDiscount
    poolDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PoolDiscountId !== action.payload.PoolDiscountId
      );
    },
    // deletePoolDiscounts
    poolDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PoolDiscountId)
      );
    },
    // poolDiscountsUpdateState
    poolDiscountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PoolDiscountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
