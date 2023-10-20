
import axios from "axios";
export const PRODUCTS_URL = "Product";
// CREATE = add a new products to the server 
export function createProduct(products) {
  return axios.post(`${PRODUCTS_URL}/post`, products);
}
// READ  
export function getAllProducts() {
  return axios.get(`${PRODUCTS_URL}/get`);
}
export function getProductById(productsId) {
  return axios.get(`${PRODUCTS_URL}/get/${productsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findProducts(queryParams) {
  return axios.post(`${PRODUCTS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateProduct(id, products) {
  return axios.put(`${PRODUCTS_URL}/put/${id}`, products);
}
// UPDATE Status  
export function updateStatusForProducts(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForProducts`, {
    ids,
    status,
  });
}
// DELETE = the products from the server  
export function deleteProduct(productsId) {
  return axios.delete(`${PRODUCTS_URL}/delete/${productsId}`);
}
// DELETE Products by ids  
export function deleteProducts(ids) {
  return axios.post(`${PRODUCTS_URL}/deleteProducts`, ids);
}

// SUGGESION PRODUCT
export function suggestProduct(query) {
  return axios.post(`${PRODUCTS_URL}/suggestion`, {
    Filters: [{ Property: "Name", Operation: 7, Values: [query] }, { Property: "Code", Operation: 5, Values: [query] }],
    OrderBy: "Name asc",
    PageNumber: 1,
    PageSize: 10,
  });
}

// items = result  
export function searchProducts(queryParams) {
  return axios.post(`${PRODUCTS_URL}/ProductSearch`, queryParams);
}