import * as requestFromServer from "./countriesCrud";
import { countriesSlice, callTypes } from "./countriesSlice";
const { actions } = countriesSlice;
export const fetchCountries = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCountries(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.countriesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find countries";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCountry = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.countryFetched({ countryForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCountryById(id)
    .then((response) => {
      const country = response.data;
      dispatch(actions.countryFetched({ countryForEdit: country }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find country";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCountry = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCountry(id)
    .then((response) => {
      dispatch(actions.countryDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete country";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCountry = (countryForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCountry(countryForCreation)
    .then((response) => {
      const country = response.data;
      dispatch(actions.countryCreated(country));
    })
    .catch((error) => {
      error.clientMessage = "Can't create country";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCountry = (id, country) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCountry(id, country)
    .then((response) => {
      dispatch(actions.countryUpdated({ country }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update country";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCountriesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCountries(ids, status)
    .then(() => {
      dispatch(actions.countriesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update countries status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCountries = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCountries(ids)
    .then(() => {
      dispatch(actions.countriesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete countries";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
