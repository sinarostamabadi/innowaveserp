
import { createSlice } from "@reduxjs/toolkit";
const initialSellDiscountDetailsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellDiscountDetailForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellDiscountDetailsSlice = createSlice({
  name: "sellDiscountDetails",
  initialState: initialSellDiscountDetailsState,
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
    // getSellDiscountDetailById  
    sellDiscountDetailFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellDiscountDetailForEdit = action.payload.sellDiscountDetailForEdit;
      state.error = null;
    },
    // findSellDiscountDetails  
    sellDiscountDetailsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSellDiscountDetail  
    sellDiscountDetailCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSellDiscountDetail  
    sellDiscountDetailUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SellDiscountDetailId === action.payload.sellDiscountDetail.SellDiscountDetailId) {
          return action.payload.sellDiscountDetail;
        }
        return entity;
      });
    },
    // deleteSellDiscountDetail  
    sellDiscountDetailDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellDiscountDetailId !== action.payload.SellDiscountDetailId  
      );
    },
    // deleteSellDiscountDetails  
    sellDiscountDetailsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellDiscountDetailId)  
      );
    },
    // sellDiscountDetailsUpdateState  
    sellDiscountDetailsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellDiscountDetailId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
