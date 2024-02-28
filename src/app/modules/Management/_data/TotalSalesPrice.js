import axios from "axios";
export const report_url = "SellMainReport";

//get report data from server in Items
export function get(filters) {
  return axios.post(`${report_url}/Get`, filters);
}
