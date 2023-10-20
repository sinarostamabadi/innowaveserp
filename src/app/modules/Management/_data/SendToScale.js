import axios from "axios";
export const report_url = "ProductManagement";

//get report data from server in Items
export function get() { 
  return axios.get(`${report_url}/GetProductForScales`); 
}