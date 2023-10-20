export const SetPricingModel = {
  SetPricingId: {
    type: "key|number",
    display: "SetPricingId",
    sortable: true,
  },
  CreationDate: {
    type: "title|DateTime",
    display: "CreationDate",
    sortable: true,
  },
  Title: {
    type: "string",
    display: "Title",
    sortable: true,
  },
  CenterId: {
    type: "number",
    display: "CenterId",
    sortable: true,
  },

  PersonId: {
    type: "number",
    display: "PersonId",
    sortable: true,
  },
  PersonCount: {
    type: "number",
    display: "PersonCount",
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
  DayInWeek: {
    type: "number",
    display: "DayInWeek",
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
