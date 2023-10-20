
import { createSlice } from "@reduxjs/toolkit";
const initialSellDocumentCostsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellDocumentCostForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellDocumentCostsSlice = createSlice({
  name: "sellDocumentCosts",
  initialState: initialSellDocumentCostsState,
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
    // getSellDocumentCostById  
    sellDocumentCostFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellDocumentCostForEdit = action.payload.sellDocumentCostForEdit;
      state.error = null;
    },
    // findSellDocumentCosts  
    sellDocumentCostsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSellDocumentCost  
    sellDocumentCostCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSellDocumentCost  
    sellDocumentCostUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SellDocumentCostId === action.payload.sellDocumentCost.SellDocumentCostId) {
          return action.payload.sellDocumentCost;
        }
        return entity;
      });
    },
    // deleteSellDocumentCost  
    sellDocumentCostDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellDocumentCostId !== action.payload.SellDocumentCostId  
      );
    },
    // deleteSellDocumentCosts  
    sellDocumentCostsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellDocumentCostId)  
      );
    },
    // sellDocumentCostsUpdateState  
    sellDocumentCostsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellDocumentCostId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
