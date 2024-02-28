import axios from "axios";
export const ADDRESSCATEGORIES_URL = "AddressCategory";
// CREATE = add a new addressCategories to the server
export function createAddressCategory(addressCategories) {
  return axios.post(`${ADDRESSCATEGORIES_URL}/post`, addressCategories);
}
// READ
export function getAllAddressCategories() {
  return axios.get(`${ADDRESSCATEGORIES_URL}/getall`);
}
export function getAddressCategoryById(addressCategoriesId) {
  return axios.get(`${ADDRESSCATEGORIES_URL}/get/${addressCategoriesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findAddressCategories(queryParams) {
  return axios.post(`${ADDRESSCATEGORIES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateAddressCategory(id, addressCategories) {
  return axios.put(`${ADDRESSCATEGORIES_URL}/put/${id}`, addressCategories);
}
// UPDATE Status
export function updateStatusForAddressCategories(ids, status) {
  return axios.post(
    `${ADDRESSCATEGORIES_URL}/updateStatusForAddressCategories`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the addressCategories from the server
export function deleteAddressCategory(addressCategoriesId) {
  return axios.delete(`${ADDRESSCATEGORIES_URL}/delete/${addressCategoriesId}`);
}
// DELETE AddressCategories by ids
export function deleteAddressCategories(ids) {
  return axios.post(`${ADDRESSCATEGORIES_URL}/deleteAddressCategories`, ids);
}
