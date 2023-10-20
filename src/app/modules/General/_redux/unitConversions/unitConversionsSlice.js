
import { createSlice } from "@reduxjs/toolkit";
const initialUnitConversionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  unitConversionForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const unitConversionsSlice = createSlice({
  name: "unitConversions",
  initialState: initialUnitConversionsState,
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
    // getUnitConversionById  
    unitConversionFetched: (state, action) => {
      state.actionsLoading = false;
      state.unitConversionForEdit = action.payload.unitConversionForEdit;
      state.error = null;
    },
    // findUnitConversions  
    unitConversionsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUnitConversion  
    unitConversionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateUnitConversion  
    unitConversionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.UnitConversionId === action.payload.unitConversion.UnitConversionId) {
          return action.payload.unitConversion;
        }
        return entity;
      });
    },
    // deleteUnitConversion  
    unitConversionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.UnitConversionId !== action.payload.UnitConversionId  
      );
    },
    // deleteUnitConversions  
    unitConversionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.UnitConversionId)  
      );
    },
    // unitConversionsUpdateState  
    unitConversionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.UnitConversionId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
