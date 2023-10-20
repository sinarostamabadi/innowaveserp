export const SellPricingModel = {
  SellPricingId: {
    type: "key|number",
    display: "SellPricingId",
    sortable: true,
  },
  SellPricingNumber: {
    type: "title|number",
    display: "SellPricingNumber",
    sortable: true,
  },
  RegisterDate: {
    type: "DateTime",
    display: "RegisterDate",
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
  IsAccepted: {
    type: "Boolean",
    display: "IsAccepted",
    sortable: true,
  },
};
