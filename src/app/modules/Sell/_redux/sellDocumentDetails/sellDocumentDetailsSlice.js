
import { createSlice } from "@reduxjs/toolkit";
const initialSellDocumentDetailsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellDocumentDetailForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellDocumentDetailsSlice = createSlice({
  name: "sellDocumentDetails",
  initialState: initialSellDocumentDetailsState,
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
    // getSellDocumentDetailById  
    sellDocumentDetailFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellDocumentDetailForEdit = action.payload.sellDocumentDetailForEdit;
      state.error = null;
    },
    // findSellDocumentDetails  
    sellDocumentDetailsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSellDocumentDetail  
    sellDocumentDetailCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      if(!!state.entities)
        state.entities.push(action.payload);
      else {
        state.entities = [];
        state.entities.push(action.payload);
      }
    },
    // updateSellDocumentDetail  
    sellDocumentDetailUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SellDocumentDetailId === action.payload.sellDocumentDetail.SellDocumentDetailId) {
          return action.payload.sellDocumentDetail;
        }
        return entity;
      });
    },
    // deleteSellDocumentDetail  
    sellDocumentDetailDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellDocumentDetailId !== action.payload.SellDocumentDetailId  
      );
    },
    // deleteSellDocumentDetails  
    sellDocumentDetailsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellDocumentDetailId)  
      );
    },
    // sellDocumentDetailsUpdateState  
    sellDocumentDetailsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellDocumentDetailId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
