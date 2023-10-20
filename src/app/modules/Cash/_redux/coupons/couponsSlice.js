
import { createSlice } from "@reduxjs/toolkit";
const initialCouponsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  couponForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const couponsSlice = createSlice({
  name: "coupons",
  initialState: initialCouponsState,
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
    // getCouponById  
    couponFetched: (state, action) => {
      state.actionsLoading = false;
      state.couponForEdit = action.payload.couponForEdit;
      state.error = null;
    },
    // findCoupons  
    couponsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoupon  
    couponCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoupon  
    couponUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CouponId === action.payload.coupon.CouponId) {
          return action.payload.coupon;
        }
        return entity;
      });
    },
    // deleteCoupon  
    couponDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CouponId !== action.payload.CouponId  
      );
    },
    // deleteCoupons  
    couponsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CouponId)  
      );
    },
    // couponsUpdateState  
    couponsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CouponId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
