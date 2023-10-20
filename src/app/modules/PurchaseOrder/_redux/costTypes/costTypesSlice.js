
import { createSlice } from "@reduxjs/toolkit";
const initialCostTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  costTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const costTypesSlice = createSlice({
  name: "costTypes",
  initialState: initialCostTypesState,
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
    // getCostTypeById  
    costTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.costTypeForEdit = action.payload.costTypeForEdit;
      state.error = null;
    },
    // findCostTypes  
    costTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCostType  
    costTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCostType  
    costTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CostTypeId === action.payload.costType.CostTypeId) {
          return action.payload.costType;
        }
        return entity;
      });
    },
    // deleteCostType  
    costTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CostTypeId !== action.payload.CostTypeId  
      );
    },
    // deleteCostTypes  
    costTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CostTypeId)  
      );
    },
    // costTypesUpdateState  
    costTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CostTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
