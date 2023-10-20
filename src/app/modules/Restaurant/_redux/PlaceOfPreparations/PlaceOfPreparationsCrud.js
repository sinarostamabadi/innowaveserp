
import axios from "axios";
export const PLACEOFPREPARATIONS_URL = "PlaceOfPreparation";
// CREATE = add a new placeOfPreparations to the server 
export function createPlaceOfPreparation(placeOfPreparations) { 
  return axios.post(`${PLACEOFPREPARATIONS_URL}/post`, placeOfPreparations); 
}
// READ  
export function getAllPlaceOfPreparations() {
  return axios.get(`${PLACEOFPREPARATIONS_URL}/getAll`);
}
export function getPlaceOfPreparationById(placeOfPreparationsId) {
  return axios.get(`${PLACEOFPREPARATIONS_URL}/get/${placeOfPreparationsId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findPlaceOfPreparations(queryParams) {
  return axios.post(`${PLACEOFPREPARATIONS_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updatePlaceOfPreparation(id, placeOfPreparations) {
  return axios.put(`${PLACEOFPREPARATIONS_URL}/put/${id}`, placeOfPreparations);
}
// UPDATE Status  
export function updateStatusForPlaceOfPreparations(ids, status) {
  return axios.post(`${PLACEOFPREPARATIONS_URL}/updateStatusForPlaceOfPreparations`, {
    ids,
    status,
  });
}
// DELETE = the placeOfPreparations from the server  
export function deletePlaceOfPreparation(placeOfPreparationsId) {
  return axios.delete(`${PLACEOFPREPARATIONS_URL}/delete/${placeOfPreparationsId}`);
}
// DELETE PlaceOfPreparations by ids  
export function deletePlaceOfPreparations(ids) {
return axios.post(`${PLACEOFPREPARATIONS_URL}/deletePlaceOfPreparations`, ids);
}