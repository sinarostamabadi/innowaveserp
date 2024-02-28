import * as requestFromServer from "./citiesCrud";
import { citiesSlice, callTypes } from "./citiesSlice";
const { actions } = citiesSlice;
export const fetchCities = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCities(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.citiesFetched({ totalCount: TotalCount, entities: Items })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find cities";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCity = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.cityFetched({ cityForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCityById(id)
    .then((response) => {
      const city = response.data;
      dispatch(actions.cityFetched({ cityForEdit: city }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find city";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCity = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCity(id)
    .then((response) => {
      dispatch(actions.cityDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete city";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCity = (cityForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCity(cityForCreation)
    .then((response) => {
      const city = response.data;
      dispatch(actions.cityCreated(city));
    })
    .catch((error) => {
      error.clientMessage = "Can't create city";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCity = (city) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCity(city)
    .then((response) => {
      dispatch(actions.cityUpdated({ city }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update city";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCitiesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCities(ids, status)
    .then(() => {
      dispatch(actions.citiesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update cities status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCities = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCities(ids)
    .then(() => {
      dispatch(actions.citiesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete cities";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
