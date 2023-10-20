export const TimePriceingModel = {
  TimePricingId: {
    type: "key|number",
    display: "TimePricingId",
    sortable: true,
  },
  CenterId: {
    type: "number",
    display: "CenterId",
    sortable: true,
  },
  ForMinutes: {
    type: "number",
    display: "ForMinutes",
    sortable: true,
  },
  PersonId: {
    type: "number",
    display: "PersonId",
    sortable: true,
  },
  FromDate: {
    type: "DateTime",
    display: "FromDate",
    sortable: true,
  },
  ToDate: {
    type: "DateTime",
    display: "ToDate",
    sortable: true,
  },
  DayInWeek: {
    type: "number",
    display: "DayInWeek",
    sortable: true,
  },
  FromTime: {
    type: "TimeSpan",
    display: "FromTime",
    sortable: true,
  },
  ToTime: {
    type: "TimeSpan",
    display: "ToTime",
    sortable: true,
  },
  IsHoliday: {
    type: "boolean",
    display: "IsHoliday",
    sortable: true,
  },
  IsForSpecialDays: {
    type: "boolean",
    display: "IsForSpecialDays",
    sortable: true,
  },
  Price: {
    type: "number",
    display: "Price",
    sortable: true,
  },
};
