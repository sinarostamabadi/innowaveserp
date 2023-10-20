import axios from "axios";
export const report_url = "BalanceReport";

//get report data from server in Items
export const GetBalanceReport = (filters) =>
  axios.post(`${report_url}/GetBalanceReport`, filters);
