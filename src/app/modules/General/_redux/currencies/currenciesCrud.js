import axios from "axios";
export const CURRENCIES_URL = "Currency";
// CREATE = add a new currencies to the server 
export function createCurrency(currencies) { 
  return axios.post(`${CURRENCIES_URL}/post`, currencies); 
}
// READ  
export function getAllCurrencies() {
  return axios.get(`${CURRENCIES_URL}/get`);
}
export function getCurrencyById(currenciesId) {
  return axios.get(`${CURRENCIES_URL}/get/${currenciesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCurrencies(queryParams) {
  return axios.post(`${CURRENCIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCurrency(id, currencies) {
  return axios.put(`${CURRENCIES_URL}/put/${id}`, currencies);
}
// UPDATE Status  
export function updateStatusForCurrencies(ids, status) {
  return axios.post(`${CURRENCIES_URL}/updateStatusForCurrencies`, {
    ids,
    status,
  });
}
// DELETE = the currencies from the server  
export function deleteCurrency(currenciesId) {
  return axios.delete(`${CURRENCIES_URL}/delete/${currenciesId}`);
}
// DELETE Currencies by ids  
export function deleteCurrencies(ids) {
return axios.post(`${CURRENCIES_URL}/deleteCurrencies`, ids);
}