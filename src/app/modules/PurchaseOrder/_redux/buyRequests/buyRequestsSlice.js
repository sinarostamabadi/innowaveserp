
import { createSlice } from "@reduxjs/toolkit";
const initialBuyRequestsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  buyRequestForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const buyRequestsSlice = createSlice({
  name: "buyRequests",
  initialState: initialBuyRequestsState,
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
    // getBuyRequestById  
    buyRequestFetched: (state, action) => {
      state.actionsLoading = false;
      state.buyRequestForEdit = action.payload.buyRequestForEdit;
      state.error = null;
    },
    // findBuyRequests  
    buyRequestsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBuyRequest  
    buyRequestCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBuyRequest  
    buyRequestUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BuyRequestId === action.payload.buyRequest.BuyRequestId) {
          return action.payload.buyRequest;
        }
        return entity;
      });
    },
    // deleteBuyRequest  
    buyRequestDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BuyRequestId !== action.payload.BuyRequestId  
      );
    },
    // deleteBuyRequests  
    buyRequestsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BuyRequestId)  
      );
    },
    // buyRequestsUpdateState  
    buyRequestsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BuyRequestId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
