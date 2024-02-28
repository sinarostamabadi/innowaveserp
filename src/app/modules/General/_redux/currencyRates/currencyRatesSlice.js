import { createSlice } from "@reduxjs/toolkit";
const initialCurrencyRatesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  currencyRateForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const currencyRatesSlice = createSlice({
  name: "currencyRates",
  initialState: initialCurrencyRatesState,
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
    // getCurrencyRateById
    currencyRateFetched: (state, action) => {
      state.actionsLoading = false;
      state.currencyRateForEdit = action.payload.currencyRateForEdit;
      state.error = null;
    },
    // findCurrencyRates
    currencyRatesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCurrencyRate
    currencyRateCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCurrencyRate
    currencyRateUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.CurrencyRateId === action.payload.currencyRate.CurrencyRateId
        ) {
          return action.payload.currencyRate;
        }
        return entity;
      });
    },
    // deleteCurrencyRate
    currencyRateDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CurrencyRateId !== action.payload.CurrencyRateId
      );
    },
    // deleteCurrencyRates
    currencyRatesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CurrencyRateId)
      );
    },
    // currencyRatesUpdateState
    currencyRatesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CurrencyRateId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
