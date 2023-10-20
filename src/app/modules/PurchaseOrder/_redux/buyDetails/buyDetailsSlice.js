
import { createSlice } from "@reduxjs/toolkit";
const initialBuyDetailsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  buyDetailForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const buyDetailsSlice = createSlice({
  name: "buyDetails",
  initialState: initialBuyDetailsState,
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
    // getBuyDetailById  
    buyDetailFetched: (state, action) => {
      state.actionsLoading = false;
      state.buyDetailForEdit = action.payload.buyDetailForEdit;
      state.error = null;
    },
    // findBuyDetails  
    buyDetailsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBuyDetail  
    buyDetailCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBuyDetail  
    buyDetailUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BuyDetailId === action.payload.buyDetail.BuyDetailId) {
          return action.payload.buyDetail;
        }
        return entity;
      });
    },
    // deleteBuyDetail  
    buyDetailDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BuyDetailId !== action.payload.BuyDetailId  
      );
    },
    // deleteBuyDetails  
    buyDetailsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BuyDetailId)  
      );
    },
    // buyDetailsUpdateState  
    buyDetailsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BuyDetailId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});