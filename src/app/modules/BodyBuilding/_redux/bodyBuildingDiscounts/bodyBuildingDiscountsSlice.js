
import { createSlice } from "@reduxjs/toolkit";
const initialBodyBuildingDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bodyBuildingDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bodyBuildingDiscountsSlice = createSlice({
  name: "bodyBuildingDiscounts",
  initialState: initialBodyBuildingDiscountsState,
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
    // getBodyBuildingDiscountById  
    bodyBuildingDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.bodyBuildingDiscountForEdit = action.payload.bodyBuildingDiscountForEdit;
      state.error = null;
    },
    // findBodyBuildingDiscounts  
    bodyBuildingDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBodyBuildingDiscount  
    bodyBuildingDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBodyBuildingDiscount  
    bodyBuildingDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BodyBuildingDiscountId === action.payload.bodyBuildingDiscount.BodyBuildingDiscountId) {
          return action.payload.bodyBuildingDiscount;
        }
        return entity;
      });
    },
    // deleteBodyBuildingDiscount  
    bodyBuildingDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BodyBuildingDiscountId !== action.payload.BodyBuildingDiscountId  
      );
    },
    // deleteBodyBuildingDiscounts  
    bodyBuildingDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingDiscountId)  
      );
    },
    // bodyBuildingDiscountsUpdateState  
    bodyBuildingDiscountsStatusUpdated: (state, action) => {
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
