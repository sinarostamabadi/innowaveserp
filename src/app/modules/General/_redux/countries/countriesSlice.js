import { createSlice } from "@reduxjs/toolkit";
const initialCountriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  countryForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const countriesSlice = createSlice({
  name: "countries",
  initialState: initialCountriesState,
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
    // getCountryById  
    countryFetched: (state, action) => {
      state.actionsLoading = false;
      state.countryForEdit = action.payload.countryForEdit;
      state.error = null;
    },
    // findCountries  
    countriesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCountry  
    countryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCountry  
    countryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CountryId === action.payload.country.CountryId) {
          return action.payload.country;
        }
        return entity;
      });
    },
    // deleteCountry  
    countryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CountryId !== action.payload.CountryId  
      );
    },
    // deleteCountries  
    countriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CountryId)  
      );
    },
    // countriesUpdateState  
    countriesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CountryId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
