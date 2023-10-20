
import axios from "axios";
export const RESTAURANTTABLES_URL = "RestaurantTable";
// CREATE = add a new restaurantTables to the server 
export function createRestaurantTable(restaurantTables) { 
  return axios.post(`${RESTAURANTTABLES_URL}/post`, restaurantTables); 
}
// READ  
export function getAllRestaurantTables() {
  return axios.get(`${RESTAURANTTABLES_URL}/getall`);
}

// GET FREE TABLES  
export function getFreeRestaurantTables() {
  return axios.post(`${RESTAURANTTABLES_URL}/get`, {"Filters":[{"Property":"TableStatusTypeId","Operation":5,"Values":["0"]}],"OrderBy":"TableStatusTypeId asc","PageNumber":1,"PageSize":10});
}

export function getRestaurantTableById(restaurantTablesId) {
  return axios.get(`${RESTAURANTTABLES_URL}/get/${restaurantTablesId}`);
}
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)  
// items = result  
export function findRestaurantTables(queryParams) {
  return axios.post(`${RESTAURANTTABLES_URL}/get`, queryParams);
}
// UPDATE = update the procuct on the server  
export function updateRestaurantTable(id, restaurantTables) {
  return axios.put(`${RESTAURANTTABLES_URL}/put/${id}`, restaurantTables);
}
// UPDATE Status  
export function updateStatusForRestaurantTables(ids, status) {
  return axios.post(`${RESTAURANTTABLES_URL}/updateStatusForRestaurantTables`, {
    ids,
    status,
  });
}
// DELETE = the restaurantTables from the server  
export function deleteRestaurantTable(restaurantTablesId) {
  return axios.delete(`${RESTAURANTTABLES_URL}/delete/${restaurantTablesId}`);
}
// DELETE RestaurantTables by ids  
export function deleteRestaurantTables(ids) {
return axios.post(`${RESTAURANTTABLES_URL}/deleteRestaurantTables`, ids);
}