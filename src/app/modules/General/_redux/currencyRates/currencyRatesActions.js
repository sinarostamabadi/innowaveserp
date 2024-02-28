import * as requestFromServer from "./currencyRatesCrud";
import { currencyRatesSlice, callTypes } from "./currencyRatesSlice";
const { actions } = currencyRatesSlice;
export const fetchCurrencyRates = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findCurrencyRates(queryParams)
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.currencyRatesFetched({
          totalCount: TotalCount,
          entities: Items,
        })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find currencyRates";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCurrencyRate = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.currencyRateFetched({ currencyRateForEdit: undefined })
    );
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getCurrencyRateById(id)
    .then((response) => {
      const currencyRate = response.data;
      dispatch(
        actions.currencyRateFetched({ currencyRateForEdit: currencyRate })
      );
    })
    .catch((error) => {
      error.clientMessage = "Can't find currencyRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCurrencyRate = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCurrencyRate(id)
    .then((response) => {
      dispatch(actions.currencyRateDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete currencyRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCurrencyRate = (currencyRateForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createCurrencyRate(currencyRateForCreation)
    .then((response) => {
      const currencyRate = response.data;
      dispatch(actions.currencyRateCreated(currencyRate));
    })
    .catch((error) => {
      error.clientMessage = "Can't create currencyRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCurrencyRate = (currencyRate) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateCurrencyRate(currencyRate)
    .then((response) => {
      dispatch(actions.currencyRateUpdated({ currencyRate }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update currencyRate";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCurrencyRatesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForCurrencyRates(ids, status)
    .then(() => {
      dispatch(actions.currencyRatesStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update currencyRates status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCurrencyRates = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteCurrencyRates(ids)
    .then(() => {
      dispatch(actions.currencyRatesDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete currencyRates";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
