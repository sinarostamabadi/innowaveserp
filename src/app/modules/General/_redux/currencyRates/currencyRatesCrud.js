import axios from "axios";
export const CURRENCYRATES_URL = "CurrencyRate";
// CREATE = add a new currencyRates to the server 
export function createCurrencyRate(currencyRates) { 
  return axios.post(`${CURRENCYRATES_URL}/post`, currencyRates); 
}
// READ  
export function getAllCurrencyRates() {
  return axios.get(`${CURRENCYRATES_URL}/get`);
}
export function getCurrencyRateById(currencyRatesId) {
  return axios.get(`${CURRENCYRATES_URL}/get/${currencyRatesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findCurrencyRates(queryParams) {
  return axios.post(`${CURRENCYRATES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateCurrencyRate(id, currencyRates) {
  return axios.put(`${CURRENCYRATES_URL}/put/${id}`, currencyRates);
}
// UPDATE Status  
export function updateStatusForCurrencyRates(ids, status) {
  return axios.post(`${CURRENCYRATES_URL}/updateStatusForCurrencyRates`, {
    ids,
    status,
  });
}
// DELETE = the currencyRates from the server  
export function deleteCurrencyRate(currencyRatesId) {
  return axios.delete(`${CURRENCYRATES_URL}/delete/${currencyRatesId}`);
}
// DELETE CurrencyRates by ids  
export function deleteCurrencyRates(ids) {
return axios.post(`${CURRENCYRATES_URL}/deleteCurrencyRates`, ids);
}