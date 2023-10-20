
import axios from "axios";
export const BRANDS_URL = "Brand";
// CREATE = add a new brands to the server 
export function createBrand(brands) { 
  return axios.post(`${BRANDS_URL}/post`, brands); 
}
// READ  
export function getAllBrands() {
  return axios.get(`${BRANDS_URL}/getAll`);
}
export function getBrandById(brandsId) {
  return axios.get(`${BRANDS_URL}/get/${brandsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findBrands(queryParams) {
  return axios.post(`${BRANDS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateBrand(id, brands) {
  return axios.put(`${BRANDS_URL}/put/${id}`, brands);
}
// UPDATE Status  
export function updateStatusForBrands(ids, status) {
  return axios.post(`${BRANDS_URL}/updateStatusForBrands`, {
    ids,
    status,
  });
}
// DELETE = the brands from the server  
export function deleteBrand(brandsId) {
  return axios.delete(`${BRANDS_URL}/delete/${brandsId}`);
}
// DELETE Brands by ids  
export function deleteBrands(ids) {
return axios.post(`${BRANDS_URL}/deleteBrands`, ids);
}

// SUGGESION BRAND
export function suggestBrand(query) {
  return axios.post(`${BRANDS_URL}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}