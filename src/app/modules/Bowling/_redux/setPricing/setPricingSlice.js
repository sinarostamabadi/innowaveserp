import { createSlice } from "@reduxjs/toolkit";
const initialSetPricingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  setPricingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const setPricingSlice = createSlice({
  name: "setPricing",
  initialState: initialSetPricingState,
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
    // getSetPricingById
    setPricingFetched: (state, action) => {
      state.actionsLoading = false;
      state.setPricingForEdit = action.payload.setPricingForEdit;
      state.error = null;
    },
    // findSetPricing
    setPricingsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSetPricing
    setPricingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSetPricing
    setPricingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SetPricingId === action.payload.setPricing.SetPricingId) {
          return action.payload.setPricing;
        }
        return entity;
      });
    },
    // deleteSetPricing
    setPricingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SetPricingId !== action.payload.SetPricingId
      );
    },
    // deleteSetPricing
    setPricingsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SetPricingId)
      );
    },
    // setPricingUpdateState
    setPricingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SetPricingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
