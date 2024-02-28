import axios from "axios";
export const BILLIARDRESERVEPRICES_URL = "BilliardReservePrice";
// CREATE = add a new billiardReservePrices to the server
export function createBilliardReservePrice(billiardReservePrices) {
  return axios.post(`${BILLIARDRESERVEPRICES_URL}/post`, billiardReservePrices);
}
// READ
export function getAllBilliardReservePrices() {
  return axios.get(`${BILLIARDRESERVEPRICES_URL}/get`);
}
export function getBilliardReservePriceById(billiardReservePricesId) {
  return axios.get(
    `${BILLIARDRESERVEPRICES_URL}/get/${billiardReservePricesId}`
  );
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items = result
export function findBilliardReservePrices(queryParams) {
  return axios.post(`${BILLIARDRESERVEPRICES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server
export function updateBilliardReservePrice(id, billiardReservePrices) {
  return axios.put(
    `${BILLIARDRESERVEPRICES_URL}/put/${id}`,
    billiardReservePrices
  );
}
// UPDATE Status
export function updateStatusForBilliardReservePrices(ids, status) {
  return axios.post(
    `${BILLIARDRESERVEPRICES_URL}/updateStatusForBilliardReservePrices`,
    {
      ids,
      status,
    }
  );
}
// DELETE = the billiardReservePrices from the server
export function deleteBilliardReservePrice(billiardReservePricesId) {
  return axios.delete(
    `${BILLIARDRESERVEPRICES_URL}/delete/${billiardReservePricesId}`
  );
}
// DELETE BilliardReservePrices by ids
export function deleteBilliardReservePrices(ids) {
  return axios.post(
    `${BILLIARDRESERVEPRICES_URL}/deleteBilliardReservePrices`,
    ids
  );
}
