import axios from "axios";

export const PRODUCTUNITS_URL = "ProductUnit";

// CREATE = add a new productUnits to the server
export function createProductUnit(productUnits) {
  return axios.post(`${PRODUCTUNITS_URL}/post`, productUnits);
}

// READ
export function getAllProductUnits() {
  return axios.get(`${PRODUCTUNITS_URL}/get`);
}

export function getProductUnitById(productUnitsId) {
  return axios.get(`${PRODUCTUNITS_URL}/get/${productUnitsId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findProductUnits(queryParams) {
  return axios.post(`${PRODUCTUNITS_URL}/get`, queryParams);
}

// UPDATE = update the procuct on the server
export function updateProductUnit(id, productUnits) {
  return axios.put(`${PRODUCTUNITS_URL}/put/${id}`, productUnits);
}

// UPDATE Status
export function updateStatusForProductUnits(ids, status) {
  return axios.post(`${PRODUCTUNITS_URL}/updateStatusForProductUnits`, {
    ids,
    status,
  });
}

// DELETE = the productUnits from the server
export function deleteProductUnit(productUnitsId) {
  return axios.delete(`${PRODUCTUNITS_URL}/delete/${productUnitsId}`);
}

// DELETE ProductUnits by ids
export function deleteProductUnits(ids) {
  return axios.post(`${PRODUCTUNITS_URL}/deleteProductUnits`, ids);
}

// GET ProductUnits by ProductId
export function getByProduct(productId) {
  return axios.post(`${PRODUCTUNITS_URL}/get`, {
    Filters: [{ Property: "ProductId", Operation: 5, Values: [productId] }],
    OrderBy: "ProductId asc",
    PageNumber: 1,
    PageSize: 10,
  });
}

// GET ProductUnits by ProductId
export function getByProductCodeUnit(code, unit) {
  return axios.post(`${PRODUCTUNITS_URL}/get`, {
    Filters: [
      { Property: "Code", Operation: 5, Values: [code] },
      { Property: "UnitId", Operation: 5, Values: [unit] },
    ],
    OrderBy: "UnitId asc",
    PageNumber: 1,
    PageSize: 10,
  });
}
