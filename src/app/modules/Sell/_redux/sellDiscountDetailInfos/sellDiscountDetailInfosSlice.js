
import { createSlice } from "@reduxjs/toolkit";
const initialSellDiscountDetailInfosState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellDiscountDetailInfoForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellDiscountDetailInfosSlice = createSlice({
  name: "sellDiscountDetailInfos",
  initialState: initialSellDiscountDetailInfosState,
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
    // getSellDiscountDetailInfoById  
    sellDiscountDetailInfoFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellDiscountDetailInfoForEdit = action.payload.sellDiscountDetailInfoForEdit;
      state.error = null;
    },
    // findSellDiscountDetailInfos  
    sellDiscountDetailInfosFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSellDiscountDetailInfo  
    sellDiscountDetailInfoCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSellDiscountDetailInfo  
    sellDiscountDetailInfoUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SellDiscountDetailInfoId === action.payload.sellDiscountDetailInfo.SellDiscountDetailInfoId) {
          return action.payload.sellDiscountDetailInfo;
        }
        return entity;
      });
    },
    // deleteSellDiscountDetailInfo  
    sellDiscountDetailInfoDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellDiscountDetailInfoId !== action.payload.SellDiscountDetailInfoId  
      );
    },
    // deleteSellDiscountDetailInfos  
    sellDiscountDetailInfosDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellDiscountDetailInfoId)  
      );
    },
    // sellDiscountDetailInfosUpdateState  
    sellDiscountDetailInfosStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellDiscountDetailInfoId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
