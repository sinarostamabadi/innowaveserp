
import axios from "axios";
export const SELLDISCOUNTDETAILINFOS_URL = "SellDiscountDetailInfo";
// CREATE = add a new sellDiscountDetailInfos to the server 
export function createSellDiscountDetailInfo(sellDiscountDetailInfos) { 
  return axios.post(`${SELLDISCOUNTDETAILINFOS_URL}/post`, sellDiscountDetailInfos); 
}
// READ  
export function getAllSellDiscountDetailInfos() {
  return axios.get(`${SELLDISCOUNTDETAILINFOS_URL}/get`);
}
export function getSellDiscountDetailInfoById(sellDiscountDetailInfosId) {
  return axios.get(`${SELLDISCOUNTDETAILINFOS_URL}/get/${sellDiscountDetailInfosId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findSellDiscountDetailInfos(queryParams) {
  return axios.post(`${SELLDISCOUNTDETAILINFOS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateSellDiscountDetailInfo(id, sellDiscountDetailInfos) {
  return axios.put(`${SELLDISCOUNTDETAILINFOS_URL}/put/${id}`, sellDiscountDetailInfos);
}
// UPDATE Status  
export function updateStatusForSellDiscountDetailInfos(ids, status) {
  return axios.post(`${SELLDISCOUNTDETAILINFOS_URL}/updateStatusForSellDiscountDetailInfos`, {
    ids,
    status,
  });
}
// DELETE = the sellDiscountDetailInfos from the server  
export function deleteSellDiscountDetailInfo(sellDiscountDetailInfosId) {
  return axios.delete(`${SELLDISCOUNTDETAILINFOS_URL}/delete/${sellDiscountDetailInfosId}`);
}
// DELETE SellDiscountDetailInfos by ids  
export function deleteSellDiscountDetailInfos(ids) {
return axios.post(`${SELLDISCOUNTDETAILINFOS_URL}/deleteSellDiscountDetailInfos`, ids);
}