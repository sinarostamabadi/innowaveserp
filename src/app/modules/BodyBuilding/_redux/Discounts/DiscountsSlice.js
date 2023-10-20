
import { createSlice } from "@reduxjs/toolkit";
const initialDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  discountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bodyBuildingDiscountsSlice = createSlice({
  name: "bodyBuildingDiscounts",
  initialState: initialDiscountsState,
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
    // getDiscountById  
    discountFetched: (state, action) => {
      state.actionsLoading = false;
      state.discountForEdit = action.payload.discountForEdit;
      state.error = null;
    },
    // findDiscounts  
    discountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDiscount  
    discountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateDiscount  
    discountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BodyBuildingDiscountId === action.payload.discount.BodyBuildingDiscountId) {
          return action.payload.discount;
        }
        return entity;
      });
    },
    // deleteDiscount  
    discountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BodyBuildingDiscountId !== action.payload.BodyBuildingDiscountId  
      );
    },
    // deleteDiscounts  
    discountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingDiscountId)  
      );
    },
    // discountsUpdateState  
    discountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BodyBuildingDiscountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
