
import axios from "axios";
export const URL = "BodyBuildingService";
// CREATE = add a new services to the server 
export function createService(services) { 
  return axios.post(`${URL}/post`, services); 
}
// READ  
export function getAllServices() {
  return axios.post(`${URL}/get`, {"Filters":[],"OrderBy":"Title asc","PageNumber":1,"PageSize":200});
}
export function getServiceById(servicesId) {
  return axios.get(`${URL}/get/${servicesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findServices(queryParams) {
  return axios.post(`${URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateService(id, services) {
  return axios.put(`${URL}/put/${id}`, services);
}
// UPDATE Status  
export function updateStatusForServices(ids, status) {
  return axios.post(`${URL}/updateStatusForServices`, {
    ids,
    status,
  });
}
// DELETE = the services from the server  
export function deleteService(servicesId) {
  return axios.delete(`${URL}/delete/${servicesId}`);
}
// DELETE Services by ids  
export function deleteServices(ids) {
return axios.post(`${URL}/deleteServices`, ids);
}

// SUGGESTION MenuItem  
export function suggestion(term) {
  return axios.post(`${URL}/get`, {"Filters":[
    { Property: "Title", Operation: 7, Values: [term] }
  ],"OrderBy":"Title asc","PageNumber":1,"PageSize":10});

}