
import { createSlice } from "@reduxjs/toolkit";
const initialFutsalDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  futsalDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const futsalDiscountsSlice = createSlice({
  name: "futsalDiscounts",
  initialState: initialFutsalDiscountsState,
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
    // getFutsalDiscountById  
    futsalDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.futsalDiscountForEdit = action.payload.futsalDiscountForEdit;
      state.error = null;
    },
    // findFutsalDiscounts  
    futsalDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createFutsalDiscount  
    futsalDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateFutsalDiscount  
    futsalDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.FutsalDiscountId === action.payload.futsalDiscount.FutsalDiscountId) {
          return action.payload.futsalDiscount;
        }
        return entity;
      });
    },
    // deleteFutsalDiscount  
    futsalDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.FutsalDiscountId !== action.payload.FutsalDiscountId  
      );
    },
    // deleteFutsalDiscounts  
    futsalDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.FutsalDiscountId)  
      );
    },
    // futsalDiscountsUpdateState  
    futsalDiscountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.FutsalDiscountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
