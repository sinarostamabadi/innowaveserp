
import axios from "axios";
export const TAXUNITS_URL = "TaxUnit";
// CREATE = add a new taxUnits to the server 
export function createTaxUnit(taxUnits) { 
  return axios.post(`${TAXUNITS_URL}/post`, taxUnits); 
}
// READ  
export function getAllTaxUnits() {
  return axios.get(`${TAXUNITS_URL}/get`);
}
export function getTaxUnitById(taxUnitsId) {
  return axios.get(`${TAXUNITS_URL}/get/${taxUnitsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findTaxUnits(queryParams) {
  return axios.post(`${TAXUNITS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateTaxUnit(id, taxUnits) {
  return axios.put(`${TAXUNITS_URL}/put/${id}`, taxUnits);
}
// UPDATE Status  
export function updateStatusForTaxUnits(ids, status) {
  return axios.post(`${TAXUNITS_URL}/updateStatusForTaxUnits`, {
    ids,
    status,
  });
}
// DELETE = the taxUnits from the server  
export function deleteTaxUnit(taxUnitsId) {
  return axios.delete(`${TAXUNITS_URL}/delete/${taxUnitsId}`);
}
// DELETE TaxUnits by ids  
export function deleteTaxUnits(ids) {
return axios.post(`${TAXUNITS_URL}/deleteTaxUnits`, ids);
}