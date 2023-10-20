
import axios from "axios";
export const PRODUCTGROUPS_URL = "ProductGroup";
// CREATE = add a new productGroups to the server 
export function createProductGroup(productGroups) {
  return axios.post(`${PRODUCTGROUPS_URL}/post`, productGroups);
}
// READ  
export function getAllProductGroups() {
  return axios.get(`${PRODUCTGROUPS_URL}/get`);
}

export function getProductGroupById(productGroupsId) {
  return axios.get(`${PRODUCTGROUPS_URL}/get/${productGroupsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findProductGroups(queryParams) {
  return axios.post(`${PRODUCTGROUPS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateProductGroup(id, productGroups) {
  return axios.put(`${PRODUCTGROUPS_URL}/put/${id}`, productGroups);
}
// UPDATE Status  
export function updateStatusForProductGroups(ids, status) {
  return axios.post(`${PRODUCTGROUPS_URL}/updateStatusForProductGroups`, {
    ids,
    status,
  });
}
// DELETE = the productGroups from the server  
export function deleteProductGroup(productGroupsId) {
  return axios.delete(`${PRODUCTGROUPS_URL}/delete/${productGroupsId}`);
}
// DELETE ProductGroups by ids  
export function deleteProductGroups(ids) {
  return axios.post(`${PRODUCTGROUPS_URL}/deleteProductGroups`, ids);
}

// SUGGESION PRODUCT
export function suggestProductGroup(query) {
  return axios.post(`${PRODUCTGROUPS_URL}/get`, {
    Filters: [{ Property: "Title", Operation: 7, Values: [query] }],
    OrderBy: "Title asc",
    PageNumber: 1,
    PageSize: 10,
  });
}

// Get Tree of data  
export function getTree(query) {
  return axios.post(`${PRODUCTGROUPS_URL}/getTree`, query);
}