import { createSlice } from "@reduxjs/toolkit";
const initialCurrenciesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  currencyForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const currenciesSlice = createSlice({
  name: "currencies",
  initialState: initialCurrenciesState,
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
    // getCurrencyById
    currencyFetched: (state, action) => {
      state.actionsLoading = false;
      state.currencyForEdit = action.payload.currencyForEdit;
      state.error = null;
    },
    // findCurrencies
    currenciesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCurrency
    currencyCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCurrency
    currencyUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CurrencyId === action.payload.currency.CurrencyId) {
          return action.payload.currency;
        }
        return entity;
      });
    },
    // deleteCurrency
    currencyDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CurrencyId !== action.payload.CurrencyId
      );
    },
    // deleteCurrencies
    currenciesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CurrencyId)
      );
    },
    // currenciesUpdateState
    currenciesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CurrencyId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
