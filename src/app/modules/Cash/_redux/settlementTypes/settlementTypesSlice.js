
import { createSlice } from "@reduxjs/toolkit";
const initialSettlementTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  settlementTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const settlementTypesSlice = createSlice({
  name: "settlementTypes",
  initialState: initialSettlementTypesState,
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
    // getSettlementTypeById  
    settlementTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.settlementTypeForEdit = action.payload.settlementTypeForEdit;
      state.error = null;
    },
    // findSettlementTypes  
    settlementTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSettlementType  
    settlementTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSettlementType  
    settlementTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SettlementTypeId === action.payload.settlementType.SettlementTypeId) {
          return action.payload.settlementType;
        }
        return entity;
      });
    },
    // deleteSettlementType  
    settlementTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SettlementTypeId !== action.payload.SettlementTypeId  
      );
    },
    // deleteSettlementTypes  
    settlementTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SettlementTypeId)  
      );
    },
    // settlementTypesUpdateState  
    settlementTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SettlementTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});