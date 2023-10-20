
import { createSlice } from "@reduxjs/toolkit";
const initialCostCentersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  costCenterForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const costCentersSlice = createSlice({
  name: "costCenters",
  initialState: initialCostCentersState,
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
    // getCostCenterById  
    costCenterFetched: (state, action) => {
      state.actionsLoading = false;
      state.costCenterForEdit = action.payload.costCenterForEdit;
      state.error = null;
    },
    // findCostCenters  
    costCentersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCostCenter  
    costCenterCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
      
      return;
    },
    // updateCostCenter  
    costCenterUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CostCenterId === action.payload.costCenter.CostCenterId) {
          return action.payload.costCenter;
        }
        return entity;
      });

      return;
    },
    // deleteCostCenter  
    costCenterDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CostCenterId !== action.payload.CostCenterId  
      );
    },
    // deleteCostCenters  
    costCentersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CostCenterId)  
      );
    },
    // costCentersUpdateState  
    costCentersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CostCenterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
