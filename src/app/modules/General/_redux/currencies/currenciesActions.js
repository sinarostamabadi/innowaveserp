import * as requestFromServer from "./currenciesCrud";
import { currenciesSlice, callTypes } from "./currenciesSlice";
const { actions } = currenciesSlice;
export const fetchCurrencies = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer  
    .findCurrencies(queryParams)  
    .then((response) => {
      const { Items, TotalCount } = response.data;
      dispatch(
        actions.currenciesFetched({ totalCount: TotalCount, entities: Items })  
      );
    })  
    .catch((error) => {
      error.clientMessage = "Can't find currencies";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};
export const fetchCurrency = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.currencyFetched({ currencyForEdit: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .getCurrencyById(id)  
    .then((response) => {
      const currency = response.data;
      dispatch(actions.currencyFetched({ currencyForEdit: currency }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't find currency";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCurrency = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCurrency(id)  
    .then((response) => {
      dispatch(actions.currencyDeleted({ id }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete currency";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const createCurrency = (currencyForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .createCurrency(currencyForCreation)  
    .then((response) => {
      const currency = response.data;
      dispatch(actions.currencyCreated(currency));
    })  
    .catch((error) => {
      error.clientMessage = "Can't create currency";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCurrency = (currency) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateCurrency(currency)  
    .then((response) => {
      dispatch(actions.currencyUpdated({ currency }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update currency";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
};
export const updateCurrenciesStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .updateStatusForCurrencies(ids, status)  
    .then(() => {
      dispatch(actions.currenciesStatusUpdated({ ids, status }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't update currencies status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
export const deleteCurrencies = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer  
    .deleteCurrencies(ids)  
    .then(() => {
      dispatch(actions.currenciesDeleted({ ids }));
    })  
    .catch((error) => {
      error.clientMessage = "Can't delete currencies";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
      throw error;
    });
}; 