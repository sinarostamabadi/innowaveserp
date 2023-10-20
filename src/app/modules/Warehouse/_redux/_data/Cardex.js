import axios from "axios";
export const report_url = "WarehouseReport";

//get report data from server in Items
export function get(filters) { 
  return axios.post(`${report_url}/GetCardex`, filters); 
}