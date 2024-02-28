import { createSlice } from "@reduxjs/toolkit";
const initialBuyRequestDetailsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  buyRequestDetailForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const buyRequestDetailsSlice = createSlice({
  name: "buyRequestDetails",
  initialState: initialBuyRequestDetailsState,
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
    // getBuyRequestDetailById
    buyRequestDetailFetched: (state, action) => {
      state.actionsLoading = false;
      state.buyRequestDetailForEdit = action.payload.buyRequestDetailForEdit;
      state.error = null;
    },
    // findBuyRequestDetails
    buyRequestDetailsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBuyRequestDetail
    buyRequestDetailCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBuyRequestDetail
    buyRequestDetailUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.BuyRequestDetailId ===
          action.payload.buyRequestDetail.BuyRequestDetailId
        ) {
          return action.payload.buyRequestDetail;
        }
        return entity;
      });
    },
    // deleteBuyRequestDetail
    buyRequestDetailDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BuyRequestDetailId !== action.payload.BuyRequestDetailId
      );
    },
    // deleteBuyRequestDetails
    buyRequestDetailsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BuyRequestDetailId)
      );
    },
    // buyRequestDetailsUpdateState
    buyRequestDetailsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BuyRequestDetailId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
