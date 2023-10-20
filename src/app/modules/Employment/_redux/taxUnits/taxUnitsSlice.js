
import { createSlice } from "@reduxjs/toolkit";
const initialTaxUnitsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  taxUnitForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const taxUnitsSlice = createSlice({
  name: "taxUnits",
  initialState: initialTaxUnitsState,
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
    // getTaxUnitById  
    taxUnitFetched: (state, action) => {
      state.actionsLoading = false;
      state.taxUnitForEdit = action.payload.taxUnitForEdit;
      state.error = null;
    },
    // findTaxUnits  
    taxUnitsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createTaxUnit  
    taxUnitCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateTaxUnit  
    taxUnitUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.TaxUnitId === action.payload.taxUnit.TaxUnitId) {
          return action.payload.taxUnit;
        }
        return entity;
      });
    },
    // deleteTaxUnit  
    taxUnitDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.TaxUnitId !== action.payload.TaxUnitId  
      );
    },
    // deleteTaxUnits  
    taxUnitsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.TaxUnitId)  
      );
    },
    // taxUnitsUpdateState  
    taxUnitsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.TaxUnitId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
