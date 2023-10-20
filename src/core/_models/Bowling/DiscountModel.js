export const DiscountModel = {
  DiscountId: {
    type: "key|number",
    display: "DiscountId",
    sortable: true,
  },
  DiscountTypeId: {
    type: "number",
    display: "DiscountTypeId",
    sortable: true,
  },
  Discount: {
    type: "title|number",
    display: "Discount",
    sortable: true,
  },
  IsForSpecialDay: {
    type: "boolean",
    display: "IsForSpecialDay",
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
};
