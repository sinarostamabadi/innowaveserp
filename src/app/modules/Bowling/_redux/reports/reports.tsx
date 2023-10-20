import axios from "axios";
import moment from "jalali-moment";

export enum TopPlayerMode {
  LastWeek = 1,
  LastTenDays = 2,
  LastMonth = 3
};

export function topPlayer(mode: TopPlayerMode) {
  let filter = {
    FromDate: "",
    ToDate: ""
  };

  switch (mode) {
    case TopPlayerMode.LastWeek:
      filter.FromDate = moment(new Date(), "en").add(-7, "days").format("YYYY-MM-DD");
      filter.ToDate = moment.from(new Date().toString(),"en").format("YYYY-MM-DD");
      break;
    case TopPlayerMode.LastTenDays:
      filter.FromDate = moment(new Date(), "en").add(-10, "days").format("YYYY-MM-DD");
      filter.ToDate = moment.from(new Date().toString(),"en").format("YYYY-MM-DD");
      break;
    case TopPlayerMode.LastMonth:
      filter.FromDate = moment(new Date(), "en").add(-31, "days").format("YYYY-MM-DD");
      filter.ToDate = moment.from(new Date().toString(),"en").format("YYYY-MM-DD");
      break;
  }
  return axios.post(`Reserve/Get10MaxReport`, filter);
}
